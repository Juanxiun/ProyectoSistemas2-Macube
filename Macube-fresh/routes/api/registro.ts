import { Handlers } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts";
import { setCookie } from "$std/http/cookie.ts";
import { ValRegister } from "../../lib/utils/validacion.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const formData = await req.formData();

    const ci = formData.get("ci")?.toString();
    const extension = formData.get("extension")?.toString();
    const nombres = formData.get("nombres")?.toString();
    const apellidos = formData.get("apellidos")?.toString();
    const telefono = formData.get("telefono")?.toString();
    const telefono2 = formData.get("telefono2")?.toString();
    const correo = formData.get("correo")?.toString();
    const pass = formData.get("pass")?.toString();

    const valReg = await ValRegister({
      ci: ci ? parseInt(ci) : undefined,
      extension: extension,
      nombres: nombres,
      apellidos: apellidos,
      telefono1: telefono ? parseInt(telefono) : undefined,
      telefono2: telefono2 ? parseInt(telefono2) : undefined,
      correo: correo,
      pass: pass,
    });

    if (valReg !== "Validacion exitosa") {
      return new Response(
        JSON.stringify({
          success: false,
          error: valReg, 
        }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    try {
-
      await db.queryObject("INSERT INTO clientes (CI, EXTENSION, NOMBRES, APELLIDOS, TELEFONO, TELEFONO2, CORREO, PASS, REFERENCIA, HABILITADO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 1)",
        [ci, extension, nombres, apellidos, telefono, telefono2, correo, pass, null]
      );

      const headers = new Headers();
      const encodedCi = encodeURIComponent(JSON.stringify({ ci }));

      setCookie(headers, {
        name: "auth",
        value: encodedCi,
        maxAge: 60 * 60 * 24,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      return new Response(
        JSON.stringify({ success: true, message: "REGISTRO exitoso" }),
        { status: 200, headers },
      );
    } catch (error) {
      console.error("Error en la inserción de datos:", error);
      return new Response(
        JSON.stringify({ error: "Error interno del servidor" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};