import { Handlers } from "$fresh/server.ts";
import db from "../../lib/db.ts"; // Cambiado de "client" a "db"

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const ci = form.get("ci")?.toString();
      const pass = form.get("pass")?.toString();

      if (!ci || !pass) {
        return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
      }

      const result = await db.queryObject(
        "SELECT * FROM clientes WHERE ci = $1 AND pass = $2",
        [ci, pass]
      );

      if (result.rows.length > 0) {
        return new Response(JSON.stringify({ success: true, message: "Login exitoso" }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ success: false, error: "CI o contraseña incorrectos" }), { status: 401 });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
  },
};
