import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { viewProy } from "../../../lib/services/projects/viewProy.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      
      const cookies = getCookies(req.headers);

      if (!cookies.auth) {
        return new Response(JSON.stringify({ error: "no logueado" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      const decodeAuth = decodeURIComponent(cookies.auth);
      const authData = JSON.parse(decodeAuth);
      
      const cod = authData.codigo;
      
      const res = await viewProy(cod) 

      // deno-lint-ignore no-explicit-any
      const proy = res.map((p: any) => ({
        id: p.id,
        nombre: p.nombre,
        tipo: p.tipo,
        precio: p.precio,
        inicio: p.inicio,
        imagen: p.imagen,
      }))

      

      if(!res){
        return new Response(JSON.stringify({ message: "sin proyectos" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify(proy), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });


    } catch (error) {
      console.error("Error en handler proyecto", error);
      return new Response(
        JSON.stringify({
          error:
            "Error al obtener la lista de proyectos. Por favor, intente nuevamente.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
