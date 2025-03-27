import { Handlers } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts";
import { setCookie } from "$std/http/cookie.ts";
import { ValLogin } from "../../lib/utils/validacion.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const url = new URL(req.url);
      const form = await req.formData();
      const ci = form.get("ci")?.toString();
      const pass = form.get("pass")?.toString();

      const valLogin = await ValLogin({
        ci: ci ? parseInt(ci) : undefined,
        password: pass,
      });

      if (valLogin !== "Validación exitosa") {
        return new Response(
          JSON.stringify({
            success: false,
            error: valLogin,
          }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      const result = await db.queryObject(
        "SELECT * FROM clientes WHERE ci = $1 AND pass = $2",
        [ci, pass],
      );

      if (result.rows.length > 0) {
        const headers = new Headers();
        const encodedCi = encodeURIComponent(JSON.stringify({ ci }));

        setCookie(headers, {
          name: "auth",
          value: encodedCi,
          maxAge: 60 * 60 * 24,
          sameSite: "Lax",
          path: "/",
          secure: false,
          httpOnly: false,
        });

        return new Response(
          JSON.stringify({ success: true, message: "Login exitoso" }),
          { status: 200, headers },
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Usuario o contraseña incorrectos",
          }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Error interno del servidor" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
