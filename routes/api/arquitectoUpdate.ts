import { Handlers } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async PUT(req) {
    const url = new URL(req.url);
    const formData = await req.formData();

    try {
      // Extracción de datos (igual que en registro)
      const ci = formData.get("ci")?.toString() || "";
      const extension = formData.get("extension")?.toString() || "";
      const nombres = formData.get("nombres")?.toString() || "";
      const apellidos = formData.get("apellidos")?.toString() || "";
      const telefono = formData.get("telefono")?.toString() || "";
      const telefono2 = formData.get("telefono2")?.toString();
      const correo = formData.get("correo")?.toString();

      // Actualización directa (sin tipos complejos)
      await db.queryObject(`
        UPDATE arquitectos SET
          extension = $1,
          nombres = $2,
          apellidos = $3,
          telefono = $4,
          telefono2 = $5,
          correo = $6
        WHERE ci = $7
      `, [
        extension, 
        nombres, 
        apellidos, 
        telefono, 
        telefono2 || null, 
        correo || null,
        ci
      ]);

      // Cookie igual que en registro
      const headers = new Headers();
      const userData = { ci, nombre: nombres };
      const encodedData = encodeURIComponent(JSON.stringify(userData));

      setCookie(headers, {
        name: "auth_arquitecto",
        value: encodedData,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      return new Response(
        JSON.stringify({ success: true, message: "Perfil actualizado" }),
        { status: 200, headers },
      );
    } catch (error) {
      console.error("Error actualizando arquitecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al actualizar. Intente nuevamente." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};