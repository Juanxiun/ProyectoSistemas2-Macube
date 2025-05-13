import { Handlers } from "$fresh/server.ts";
import { isValidNumber } from "$std/semver/_shared.ts";
import { valLogin } from "../../../lib/utils/userVal.ts";
import { jsonSuccess } from "../../../lib/utils/response.ts";
import { loginUser } from "../../../services/usuarios/login.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const formData = await req.formData();
      let rol: "cli" | "arq" = "arq";

      const codigoRaw = formData.get("codigo")?.toString() ?? "";
      const pass = formData.get("pass")?.toString() ?? "";

      //ajustar login segun rol y validar
      const validar = valLogin(codigoRaw, pass);
      rol = isValidNumber(parseInt(codigoRaw)) ? "cli" : "arq";

      console.log("rol", rol);

      if (validar?.includes("ERROR.")) {
        return jsonSuccess({ error: validar }, 400);
      }

      //mandar datos al servicio de login
      const login = await loginUser(codigoRaw, pass);

      if (login.toString().includes("ERROR.")) {
        return jsonSuccess({ error: login }, 400);
      }
      //capturar nombre y volverlo string
      const nombre = login.toString();

      //crear cookie
      const headers = new Headers();
      const url = new URL(req.url);
      const valuesCook = encodeURIComponent(
        JSON.stringify({ codigo: codigoRaw, rol: rol, nombre: nombre }),
      );

      await setCookie(headers, {
        name: "auth",
        value: valuesCook,
        maxAge: 60 * 60 * 24,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: url.protocol === "https:",
        httpOnly: true,
      });
      headers.set("Content-Type", "application/json");

      //mandar respuesta
      return jsonSuccess({ message: `COMPLETADO. bienvenido ${login}` }, 200, headers);
      
    } catch (error) {
      console.log(`ERROR n el login\n`, error);
      return jsonSuccess({ error: `ERROR en el login, ${error}` }, 400);
    }
  },
};
