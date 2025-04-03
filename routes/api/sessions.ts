import { Handlers } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts";
import { setCookie } from "$std/http/cookie.ts";
import { ValLogin } from "../../lib/utils/validacion.ts";
import { isValidNumber } from "$std/semver/_shared.ts";

export const handler: Handlers = {
  async POST(req) {
    try {

      const form = await req.formData();
      const ci = form.get("ci")?.toString()?.trim();
      const pass = form.get("pass")?.toString();

      if (!ci || !pass) {
        return jsonResponse(400, { 
          success: false, 
          error: "CI y contraseña son requeridos" 
        });
      }

      if(ci && isValidNumber(parseInt(ci))){
        const validationMessage = await ValLogin({
          ci: parseInt(ci),
          password: pass,
        });
  
        if (validationMessage !== "Validación exitosa") {
          return jsonResponse(401, { 
            success: false, 
            error: validationMessage 
          });
        }
      }

      const isCLient = isValidNumber(parseInt(ci))? true : false


      // Buscar en la tabla correspondiente
      let query: string;
      let params: unknown[];

      if (isCLient) {
        query = "SELECT ci FROM clientes WHERE ci = $1 AND pass = $2 LIMIT 1";
        params = [parseInt(ci), pass];
      } else {
        query = "SELECT ci FROM arquitectos WHERE codigo = $1 AND pass = $2 LIMIT 1";
        params = [ci, pass]; // CI como string
      }

      const result = await db.queryObject<{ ci: string | number }>(query, params);

      if (result.rows.length === 0) {
        return jsonResponse(401, {
          success: false,
          error: "Usuario o contraseña incorrectos",
        });
      }

      // Login exitoso
      const headers = new Headers();
      setCookie(headers, {
        name: "auth",
        value: encodeURIComponent(JSON.stringify({ 
          ci,
          tipo: isCLient? "cli" : "arq", 
        })),
        maxAge: 86400,
        sameSite: "Lax",
        path: "/",
        secure: false,
        httpOnly: true,
      });

      return jsonResponse(200, { 
        success: true, 
        message: "Login exitoso",
      }, headers);

    } catch (error) {
      console.error("Login error:", error);
      return jsonResponse(500, { 
        success: false,
        error: "Error interno del servidor" 
      });
    }
  },
};

// Helper para respuestas JSON
function jsonResponse(
  status: number,
  data: object,
  headers?: Headers,
): Response {
  const responseHeaders = headers || new Headers();
  responseHeaders.set("Content-Type", "application/json");
  
  return new Response(
    JSON.stringify(data),
    { status, headers: responseHeaders },
  );
}
