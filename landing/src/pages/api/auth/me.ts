/**
 * GET /api/auth/me
 *
 * возвращает данные текущего пользователя по cookie/Bearer-токену.
 * - при отсутствии или невалидной сессии: 401, { ok: false }
 * - при успехе: { ok, user: { email, name, plan, createdAt, role } }
 *
 * используется страницами /account и /admin для отрисовки данных без
 * перезагрузки страницы и для проверки авторизации.
 */

import type { APIRoute } from "astro";
import { getSessionFromRequest } from "../../../lib/auth";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return json({ ok: false, error: "не авторизован" }, 401);
  }

  const { user, role } = session;
  return json({
    ok:   true,
    user: {
      email:     user.email,
      name:      user.name,
      plan:      user.plan ?? "open-beta",
      createdAt: user.createdAt,
      role,
    },
  });
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
