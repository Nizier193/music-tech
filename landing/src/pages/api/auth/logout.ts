/**
 * POST /api/auth/logout
 *
 * стирает session-cookie. на клиенте дополнительно чистим localStorage.
 * не требует тела запроса.
 */

import type { APIRoute } from "astro";
import { clearSessionCookie } from "../../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie":   clearSessionCookie(),
    },
  });
};

export const GET = POST;
