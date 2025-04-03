import { Handlers } from "$fresh/server.ts";
import { db } from "../../../lib/database/connect.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);
      const ci = url.searchParams.get("ci");

      if (!ci) {
        return new Response(
          JSON.stringify({ error: "Se requiere CI" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      // Consulta simple sin tipos genéricos
      const result = await db.queryObject(`
        SELECT ci, extension, nombres, apellidos, telefono, telefono2, correo
        FROM arquitectos 
        WHERE ci = $1
      `, [ci]);

      if (result.rows.length === 0) {
        return new Response(
          JSON.stringify({ error: "Arquitecto no encontrado" }),
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: result.rows[0] }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      console.error("Error obteniendo arquitecto:", error);
      return new Response(
        JSON.stringify({ error: "Error interno del servidor" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};