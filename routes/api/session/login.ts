import { Handlers } from "$fresh/server.ts";
import { isValidNumber } from "$std/semver/_shared.ts";
import { setCookie } from "$std/http/cookie.ts";
import { loginArq, loginCli } from "../../../lib/services/session/login.ts";
import {
  valLoginArq,
  valLoginCli,
} from "../../../lib/utils/validations/user/LoginValids.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const formData = await req.formData();
    let rol: "cli" | "arq" = "arq";

    try {
      const codigoRaw = formData.get("codigo")?.toString() ?? "";
      const pass = formData.get("pass")?.toString() ?? "";

      const codigoNum = parseInt(codigoRaw);
      const isClient = !isNaN(codigoNum) && isValidNumber(codigoNum);

      const val = isClient
        ? await valLoginCli(codigoNum, pass)
        : await valLoginArq(codigoRaw, pass);

      if(val.includes("ERROR.")){
        return new Response(
          JSON.stringify({ error: val }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const res = isClient
        ? await loginCli(codigoNum, pass)
        : await loginArq(codigoRaw, pass);

      rol = isClient ? "cli" : "arq";
      console.log(`${isClient ? "cliente" : "arquitecto"}`);

      if (!res) {
        return new Response(
          JSON.stringify({ error: "USUARIO O CONTRASEÑA INCORRECTO" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Configurar cookie
      const headers = new Headers();
    
      // deno-lint-ignore no-explicit-any
      const result = res.map((r:any)=>({
        nombres: r.nombres,
        apellidos: r.apellidos
      }));

      const name = `${result[0].nombres} ${result[0].apellidos}`
      
      setCookie(headers, {
        name: "auth",
        value: encodeURIComponent(
          JSON.stringify({
            codigo: isClient ? codigoNum : codigoRaw,
            rol: rol,
            nombre: name
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
        JSON.stringify({ success: true, message: "Login exitoso" }),
        { status: 200, headers },
      );
    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({ error: "Error al iniciar sesion. Intente nuevamente." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
