import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { createCli } from "../../../lib/services/users/create.ts";
import { valRegCli } from "../../../lib/utils/validations/user/RegisterValid.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const formData = await req.formData();
    const rol = "cli";

    try {
      const ci = formData.get("ci")?.toString() ?? "";
      const extension = formData.get("extension")?.toString() ?? "";
      const nombres = formData.get("nombre")?.toString() ?? "";
      const apellidos = formData.get("apellido")?.toString() ?? "";
      const telefono1 = formData.get("telefono1")?.toString() ?? "";
      const telefono2 = formData.get("telefono2")?.toString() ?? "";
      const direccion = formData.get("direccion")?.toString() ?? "";
      const email = formData.get("email")?.toString() ?? "";
      const pass = formData.get("pass")?.toString() ?? "";



      const valReg = valRegCli({
        ci: parseInt(ci),
        extension,
        nombres,
        apellidos,
        telefono1: parseInt(telefono1),
        telefono2: parseInt(telefono2),
        email,
        pass,
      });

      if (valReg.includes("ERROR.")) {
        return new Response(
          JSON.stringify({ error: valReg }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      await createCli({
        ci: parseInt(ci),
        extension,
        nombre: nombres,
        apellido: apellidos,
        telefono: parseInt(telefono1),
        telefono2: parseInt(telefono2),
        direccion: direccion,
        correo: email,
        pass,
      });

      // Configurar cookie
      const headers = new Headers();
      const cix = parseInt(ci);
      setCookie(headers, {
        name: "auth",
        value: encodeURIComponent(
          JSON.stringify({
            codigo: cix,
            rol: rol
          }),
        ),
        maxAge: 60 * 60 * 24,
        sameSite: "Lax",
        domain: url.hostname !== "localhost" ? url.hostname : undefined,
        path: "/",
        secure: url.protocol === "https:",
        httpOnly: true,
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
