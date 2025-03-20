import { Handlers } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const url = new URL(req.url);
      const form = await req.formData();
      const ci = form.get("ci")?.toString();
      const pass = form.get("pass")?.toString();

      if (!ci || !pass) {
        return new Response(JSON.stringify({ error: "Faltan datos" }), {
          status: 400,
        });
      }

      const result = await db.queryObject(
        "SELECT * FROM clientes WHERE ci = $1 AND pass = $2",
        [ci, pass],
      );

      if (result.rows.length > 0) {
        const headers = new Headers();

        setCookie(headers, {
          name: "auth",
          value: JSON.stringify({ ci }),
          maxAge: 60 * 60 * 24,
          sameSite: "Lax",
          domain: url.hostname,
          path: "/",
          secure: true,
        });

        return new Response(
          JSON.stringify({ success: true, message: "Login exitoso" }),
          { status: 200 },
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: "CI o contraseña incorrectos",
          }),
          { status: 401 },
        );
      }
    } catch (_error) {
      return new Response(
        JSON.stringify({ error: "Error interno del servidor\n", _error }),
        { status: 500 },
      );
    }
  },
};
