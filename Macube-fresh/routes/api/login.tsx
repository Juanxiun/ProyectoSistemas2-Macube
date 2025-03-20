import { Handlers } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts"

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const correo = form.get("correo")?.toString();
      const pass = form.get("pass")?.toString();

      if (!correo || !pass) {
        return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
      }

      const result = await db.queryObject(
        "SELECT * FROM clientes WHERE correo = $1 AND pass = $2",
        [correo, pass]
      );

      if (result.rows.length > 0) {
        return new Response(JSON.stringify({ success: true, message: "Login exitoso" }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ success: false, error: "Correo o contraseña incorrectos" }), { status: 401 });
      }
    } catch (_error) {
      return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
  },
};