import { Handlers } from "$fresh/server.ts";
import { MOD_PROYECTOS } from "../../../lib/database/models/proyectoModel.ts";
import { getProyectos } from "../../../lib/services/proyecto/proyectoService.ts";

export const handler: Handlers = {
  //ver proyectos
  async GET(req) {
    try {
      const url = new URL(req.url);
      const id = Number(url.searchParams.get("id"));

      if (id && id > 0) {
        const proy: MOD_PROYECTOS[] = await getProyectos(id);

        if (proy.length > 0) {
          return new Response(JSON.stringify(proy), {
            headers: { "Content-type": "application/json" },
          });
        }
        return new Response(
          JSON.stringify({ error: "No existe el proyecto" }),
          {
            status: 404,
          },
        );
      }

      const proy: MOD_PROYECTOS[] = await getProyectos();
      return new Response(JSON.stringify(proy), {
        headers: { "Content-Type": "application/json" },
      });

    } catch (err) {
      console.log("Error - GET -handler: \n" + err);
      return new Response(JSON.stringify({ error: "Internal Server Error: \n"+ err }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },


  
};
