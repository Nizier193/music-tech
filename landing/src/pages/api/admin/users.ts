/**
 * GET    /api/admin/users               список пользователей (по убыванию даты)
 * POST   /api/admin/users               создать пользователя (без подтверждения e-mail)
 * DELETE /api/admin/users               удалить пользователя по { email }
 *
 * все методы требуют сессию с ролью "admin" (см. ADMIN_EMAIL в env).
 * для удобства одной ручкой обрабатываем три метода — frontend
 * посылает запросы только сюда.
 */

import type { APIRoute } from "astro";
import {
  countUsers,
  deleteUser,
  getSessionFromRequest,
  getUser,
  hashPassword,
  isValidEmail,
  listUsers,
  normalizeEmail,
  saveUser,
  roleOf,
} from "../../../lib/auth";

export const prerender = false;

async function requireAdmin(request: Request) {
  const session = await getSessionFromRequest(request);
  if (!session) return { error: "не авторизован", status: 401 as const };
  if (session.role !== "admin") return { error: "только для администратора", status: 403 as const };
  return { session };
}

export const GET: APIRoute = async ({ request, url }) => {
  const guard = await requireAdmin(request);
  if (!("session" in guard)) return json({ ok: false, error: guard.error }, guard.status);

  const offset = Number(url.searchParams.get("offset") ?? "0") || 0;
  const limit  = Math.min(Number(url.searchParams.get("limit") ?? "100") || 100, 500);

  const [users, total] = await Promise.all([listUsers(offset, limit), countUsers()]);

  return json({
    ok:    true,
    total,
    offset,
    limit,
    users: users.map((u) => ({
      email:     u.email,
      name:      u.name,
      plan:      u.plan ?? "open-beta",
      createdAt: u.createdAt,
      role:      roleOf(u.email),
    })),
  });
};

export const POST: APIRoute = async ({ request }) => {
  const guard = await requireAdmin(request);
  if (!("session" in guard)) return json({ ok: false, error: guard.error }, guard.status);

  let body: any;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: "invalid json" }, 400); }

  const email    = normalizeEmail(String(body?.email    ?? ""));
  const name     = String(body?.name     ?? "").trim();
  const password = String(body?.password ?? "");

  if (!isValidEmail(email)) return json({ ok: false, error: "укажите корректный e-mail" }, 400);
  if (name.length < 2 || name.length > 60) return json({ ok: false, error: "имя от 2 до 60 символов" }, 400);
  if (password.length < 8) return json({ ok: false, error: "пароль от 8 символов" }, 400);

  if (await getUser(email)) {
    return json({ ok: false, error: "пользователь уже существует" }, 409);
  }

  await saveUser({
    email,
    name,
    pwdHash:   await hashPassword(password),
    createdAt: Date.now(),
    plan:      "open-beta",
  });

  return json({ ok: true, message: "пользователь создан" });
};

export const DELETE: APIRoute = async ({ request }) => {
  const guard = await requireAdmin(request);
  if (!("session" in guard)) return json({ ok: false, error: guard.error }, guard.status);

  let body: any;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: "invalid json" }, 400); }

  const email = normalizeEmail(String(body?.email ?? ""));
  if (!isValidEmail(email)) return json({ ok: false, error: "укажите корректный e-mail" }, 400);
  if (email === guard.session.user.email) {
    return json({ ok: false, error: "нельзя удалить свой аккаунт через админку" }, 400);
  }
  const target = await getUser(email);
  if (!target) return json({ ok: false, error: "пользователь не найден" }, 404);

  await deleteUser(email);
  return json({ ok: true, message: "удалено" });
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
