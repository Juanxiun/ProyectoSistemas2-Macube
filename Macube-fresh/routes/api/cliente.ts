import { HandlerContext } from "$fresh/server.ts";
import { db } from "../../lib/database/connect.ts"; // Asegúrate de tener la conexión a la base de datos

export const handler = async (req: Request, ctx: HandlerContext) => {
  
  const cookies = req.headers.get("Cookie") || "";
  const match = cookies.match(/auth_cliente=([^;]+)/);
  if (!match) {
    return new Response(
      JSON.stringify({ success: false, error: "No autenticado" }),
      { status: 401 },
    );
  }

  const clienteId = match[1];

  try {
    const resultado = await db.queryObject<
      { nombres: string; apellidos: string }
    >(
      "SELECT nombres, apellidos FROM clientes WHERE ci = $1",
      [clienteId],
    );

    if (resultado.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Cliente no encontrado" }),
        { status: 404 },
      );
    }

    return new Response(
      JSON.stringify({ success: true, usuario: resultado.rows[0] }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (_error) {
    return new Response(
      JSON.stringify({ success: false, error: "Error en la base de datos" }),
      { status: 500 },
    );
  }
};
