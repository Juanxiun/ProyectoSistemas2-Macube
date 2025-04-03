import { Handlers } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const formData = await req.formData();

    try {
      // Extracción de datos
      const codigo = formData.get("codigo")?.toString() || "";
      const ci = formData.get("ci")?.toString() || "";
      const extension = formData.get("extension")?.toString() || "";
      const nombres = formData.get("nombres")?.toString() || "";
      const apellidos = formData.get("apellidos")?.toString() || "";
      const telefono = formData.get("telefono")?.toString() || "";
      const correo = formData.get("correo")?.toString();
      const pass = formData.get("pass")?.toString() || "";

      // Inserción en base de datos
      await db.queryObject(`
        INSERT INTO arquitectos 
          (codigo, ci, extension, nombres, apellidos, telefono, correo, pass, habilitado) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, 1)`,
        [
          codigo.toString(),
          ci, 
          extension, 
          nombres, 
          apellidos, 
          telefono, 
          correo || null, 
          pass,
        ]
      );

      // Configurar cookie
      const headers = new Headers();
      
      setCookie(headers, {
        name: "auth",
        value: encodeURIComponent(JSON.stringify({
          codigo,
          tipo: "arq"
        })),
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      return new Response(
        JSON.stringify({ success: true, message: "Registro exitoso" }),
        { status: 200, headers },
      );
    } catch (error) {
      console.error("Error en registro:", error);
      return new Response(
        JSON.stringify({ error: "Error al registrar. Intente nuevamente." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};