import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { proyInView } from "../../../../lib/services/projects/View/proyInView.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      const cookies = getCookies(req.headers);

      if (!id) {
        return new Response(JSON.stringify({ error: "no entregó el id" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!cookies.auth) {
        return new Response(JSON.stringify({ error: "no logueado" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }


      const result = await proyInView(parseInt(id));

      // deno-lint-ignore no-explicit-any
      const proyview = result?.map((p: any) => ({
        id: p.id,
        idproy: p.idpro,
        asunto: p.asunto,
        detalles: p.inspecciondes,
        fechains: p.fechains,
        estado: p.estado,
      }))

      console.log(proyview)
      

      return new Response(JSON.stringify(proyview), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    } catch (error) {
      console.error("Error en GET proyID:", error);
      return new Response(
        JSON.stringify({ error: "Error interno del servidor" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
