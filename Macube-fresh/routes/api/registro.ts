import { HandlerContext } from "$fresh/server.ts";
import {db} from "../../lib/database/connect.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Método no permitido", { status: 405 });
  }

  const url = new URL(req.url);
  const formData = await req.formData();
  const ci = formData.get("ci");
  const extension = formData.get("extension");
  const nombres = formData.get("nombres");
  const apellidos = formData.get("apellidos");
  const telefono = formData.get("telefono");
  const telefono2 = formData.get("telefono2");
  const correo = formData.get("correo");
  const pass = formData.get("pass");

  if (!ci || !extension || !nombres || !apellidos || !telefono || !pass) {
    return new Response("Faltan campos obligatorios", { status: 400 });
  }

  try {
    const query = `
      INSERT INTO clientes (CI, EXTENSION, NOMBRES, APELLIDOS, TELEFONO, TELEFONO2, CORREO, PASS, REFERENCIA, HABILITADO)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 1)
    `;
    await db.queryObject(query, [
      ci,
      extension,
      nombres,
      apellidos,
      telefono,
      telefono2 || null, 
      correo || null,    
      pass,
      null,
    ]);

    const headers = new Headers();

    setCookie(headers, {
      name: "auth",
      value: JSON.stringify({ ci }),
      maxAge: 60 * 60 * 24,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    return new Response("Registro exitoso", { status: 200 });
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
};