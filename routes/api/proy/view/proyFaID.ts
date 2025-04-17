import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { proyFaView } from "../../../../lib/services/projects/View/proyFaView.ts";

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


      const result = await proyFaView(parseInt(id));

      // deno-lint-ignore no-explicit-any
      const proyview = result?.map((p: any) => ({
        id: p.id,
        idpro: p.idpro,
        fase: p.fase,
        descripcion: p.fasedes,
        fechafase: p.fechafase,
      }))

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
