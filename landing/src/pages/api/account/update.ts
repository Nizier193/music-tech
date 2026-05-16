/**
 * POST /api/account/update
 *
 * принимает любую комбинацию полей:
 *   { name?:    string }                         - сменить отображаемое имя
 *   { newPassword?: string, currentPassword?: string }
 *                                                - сменить пароль (требует текущий)
 *
 * для смены e-mail используется отдельный эндпоинт /api/account/change-email,
 * чтобы можно было подтвердить новый адрес кодом.
 *
 * требует валидную сессию (cookie или Bearer-токен).
 */

import type { APIRoute } from "astro";
import {
  getSessionFromRequest,
  hashPassword,
  rateLimit,
  saveUser,
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

  const user = { ...session.user };
  const changes: string[] = [];

  // -- имя --
  if (typeof body?.name === "string") {
    const newName = body.name.trim();
    if (newName.length < 2 || newName.length > 60) {
      return json({ ok: false, error: "имя от 2 до 60 символов" }, 400);
    }
    if (newName !== user.name) {
      user.name = newName;
      changes.push("name");
    }
  }

  // -- пароль --
  if (typeof body?.newPassword === "string" && body.newPassword.length > 0) {
    const currentPassword = String(body?.currentPassword ?? "");
    const newPassword     = String(body.newPassword);
    if (newPassword.length < 8) {
      return json({ ok: false, error: "новый пароль должен быть от 8 символов" }, 400);
    }
    if (!currentPassword) {
      return json({ ok: false, error: "введите текущий пароль" }, 400);
    }
    const limit = await rateLimit(`pwd:${user.email}`, 60 * 10, 5);
    if (!limit.ok) {
      return json({
        ok: false,
        error: `слишком много попыток, подождите ${limit.resetIn}с`,
      }, 429);
    }
    const ok = await verifyPassword(currentPassword, user.pwdHash);
    if (!ok) {
      return json({ ok: false, error: "текущий пароль неверный" }, 401);
    }
    user.pwdHash = await hashPassword(newPassword);
    changes.push("password");
  }

  if (changes.length === 0) {
    return json({ ok: true, message: "нет изменений", changes });
  }

  try {
    await saveUser(user);
    return json({
      ok:      true,
      message: "сохранено",
      changes,
      user: {
        email:     user.email,
        name:      user.name,
        plan:      user.plan ?? "open-beta",
        createdAt: user.createdAt,
        role:      session.role,
      },
    });
  } catch (err: any) {
    console.error("update error:", err?.message ?? err);
    return json({ ok: false, error: "не удалось сохранить, попробуйте позже" }, 500);
  }
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
