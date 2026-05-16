/**
 * POST /api/account/change-email
 *
 * двухшаговая смена e-mail (без потери аккаунта):
 *
 * шаг 1  { newEmail, currentPassword }
 *   - валидируем
 *   - проверяем текущий пароль
 *   - проверяем что новый email свободен
 *   - кладём в redis change:{old} = { newEmail, code }
 *   - шлём 6-значный код на NEW email через resend
 *   - отвечаем { ok: true, step: "code-sent" }
 *
 * шаг 2  { code }
 *   - читаем change:{old}, сравниваем код
 *   - удаляем старый user:{old}, создаём user:{new}
 *   - обновляем индекс
 *   - выпускаем новый jwt (sub меняется)
 *   - отвечаем { ok: true, token, user }
 *
 * требует валидную сессию.
 */

import type { APIRoute } from "astro";
import {
  buildSessionCookie,
  getSessionFromRequest,
  getUser,
  isValidEmail,
  issueToken,
  k,
  makeCode,
  normalizeEmail,
  rateLimit,
  redis,
  roleOf,
  saveUser,
  deleteUser,
  sendVerificationCode,
  verifyPassword,
} from "../../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const session = await getSessionFromRequest(request);
  if (!session) return json({ ok: false, error: "не авторизован" }, 401);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid json" }, 400);
  }

  const r = redis();
  const oldEmail = session.user.email;

  // ─────────────── шаг 2: подтверждение кодом ───────────────
  if (body?.code) {
    const code = String(body.code).trim();
    if (!/^\d{6}$/.test(code)) {
      return json({ ok: false, error: "код должен быть из 6 цифр" }, 400);
    }

    const pending = (await r.get(changeKey(oldEmail))) as
      | { newEmail: string; code: string; attempts: number }
      | null;

    if (!pending) {
      return json({ ok: false, error: "запрос на смену email не найден или истёк" }, 410);
    }
    if (pending.attempts >= 5) {
      await r.del(changeKey(oldEmail));
      return json({ ok: false, error: "слишком много неверных попыток" }, 429);
    }
    if (pending.code !== code) {
      await r.set(changeKey(oldEmail), {
        ...pending,
        attempts: pending.attempts + 1,
      }, { keepTtl: true });
      return json({
        ok: false,
        error: "неверный код",
        attempts_left: 5 - (pending.attempts + 1),
      }, 401);
    }

    const newEmail = pending.newEmail;
    const conflict = await r.exists(k.user(newEmail));
    if (conflict) {
      await r.del(changeKey(oldEmail));
      return json({ ok: false, error: "email уже занят" }, 409);
    }

    // создаём новую запись, удаляем старую
    const updated = { ...session.user, email: newEmail };
    await saveUser(updated);
    await deleteUser(oldEmail);
    await r.del(changeKey(oldEmail));

    const token = await issueToken(newEmail, updated.name);
    return json({
      ok:    true,
      token,
      user:  {
        email:     newEmail,
        name:      updated.name,
        plan:      updated.plan ?? "open-beta",
        createdAt: updated.createdAt,
        role:      roleOf(newEmail),
      },
    }, 200, { "set-cookie": buildSessionCookie(token, 60 * 60 * 24 * 30) });
  }

  // ─────────────── шаг 1: запрос смены ───────────────
  const newEmail        = normalizeEmail(String(body?.newEmail ?? ""));
  const currentPassword = String(body?.currentPassword ?? "");

  if (!isValidEmail(newEmail)) {
    return json({ ok: false, error: "укажите корректный e-mail" }, 400);
  }
  if (newEmail === oldEmail) {
    return json({ ok: false, error: "это уже ваш текущий email" }, 400);
  }
  if (!currentPassword) {
    return json({ ok: false, error: "введите текущий пароль" }, 400);
  }

  const limit = await rateLimit(`change:${oldEmail}`, 60 * 60, 5);
  if (!limit.ok) {
    return json({
      ok: false,
      error: "слишком много запросов, попробуйте через час",
    }, 429);
  }

  const passOk = await verifyPassword(currentPassword, session.user.pwdHash);
  if (!passOk) {
    return json({ ok: false, error: "пароль неверный" }, 401);
  }

  const taken = await getUser(newEmail);
  if (taken) {
    return json({ ok: false, error: "этот email уже зарегистрирован" }, 409);
  }

  const code = makeCode();
  await r.set(
    changeKey(oldEmail),
    { newEmail, code, attempts: 0 },
    { ex: 60 * 10 },
  );

  try {
    await sendVerificationCode(newEmail, code);
  } catch (err: any) {
    console.error("change-email send error:", err?.message ?? err);
    return json({ ok: false, error: "не удалось отправить код" }, 500);
  }

  return json({
    ok:        true,
    step:      "code-sent",
    newEmail,
    expiresIn: 600,
  });
};

function changeKey(oldEmail: string): string {
  return `change:${oldEmail}`;
}

function json(
  data: unknown,
  status = 200,
  extra: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extra,
    },
  });
}
