import { Handlers } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts";
import { setCookie } from "$std/http/cookie.ts";
import { ValLogin } from "../../lib/utils/validacion.ts";

// Definimos la interfaz para el resultado de la consulta
interface ArquitectoDB {
  ci: number;
  nombres: string;
  apellidos: string;
  // Puedes añadir más campos si son necesarios
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const url = new URL(req.url);
      const form = await req.formData();
      const ci = form.get("ci")?.toString();
      const pass = form.get("pass")?.toString();

      // Validación idéntica al original
      const valLogin = await ValLogin({
        ci: ci ? parseInt(ci) : undefined,
        password: pass,
      });

      if (valLogin !== "Validación exitosa") {
        return new Response(
          JSON.stringify({
            success: false,
            error: valLogin,
          }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      // Consulta con tipo explícito
      const result = await db.queryObject<ArquitectoDB>(
        "SELECT ci, nombres, apellidos FROM arquitectos WHERE ci = $1 AND pass = $2",
        [ci, pass],
      );

      if (result.rows.length > 0) {
        const arquitecto = result.rows[0]; // Obtenemos el primer resultado
        const headers = new Headers();
        const encodedCi = encodeURIComponent(JSON.stringify({ 
          ci: arquitecto.ci, 
          nombre: arquitecto.nombres
        }));

        // Cookie específica para arquitectos
        setCookie(headers, {
          name: "auth_arquitecto",
          value: encodedCi,
          maxAge: 60 * 60 * 24,
          sameSite: "Lax",
          path: "/",
          secure: false,
          httpOnly: false,
          domain: url.hostname,
        });

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Login exitoso",
            usuario: {
              ci: arquitecto.ci,
              nombres: arquitecto.nombres,
              apellidos: arquitecto.apellidos
            }
          }),
          { status: 200, headers },
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: "CI o contraseña incorrectos",
          }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }
    } catch (error) {
      console.error("Error en login de arquitecto:", error);
      return new Response(
        JSON.stringify({ 
          error: "Error interno del servidor",
          detalle: error instanceof Error ? error.message : "Desconocido"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};