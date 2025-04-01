import { Handlers } from "$fresh/server.ts";
import { MOD_PROYECTOS } from "../../../lib/database/models/proyectoModel.ts";
import {
  deleteProyectos,
  getProyectos,
  postProyectos,
  putProyectos,
} from "../../../lib/services/proyecto/proyectoService.ts";

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
      return new Response(
        JSON.stringify({ error: "Internal Server Error: \n" + err }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },

  //crear proyectos
  async POST(req) {
    try {
      const body = await req.json();
      const { cicli, codearq, nombre, tipo, inicio, final, imagen } = body;

      const dateInit = fechasConvert(inicio);
      const dateFin = fechasConvert(final);

      const newProyecto: MOD_PROYECTOS = {
        id: 0,
        cicli,
        codearq,
        nombre,
        tipo,
        inicio: new Date(dateInit),
        final: new Date(dateFin),
        imagen,
        habilitado: 1,
      };

      const regist = await postProyectos(newProyecto);

      if (regist !== "success") {
        return new Response(
          JSON.stringify({ error: regist }),
          { status: 400 },
        );
      }

      return new Response(JSON.stringify({ message: "proyecto registrado" }), {
        status: 201,
      });
    } catch (err) {
      console.log("Error - POST -handler: \n" + err);
      return new Response(
        JSON.stringify({ error: "Internal Server Error: \n" + err }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },

  //editar proyecto
  async PUT(req) {
    try {
      const body = await req.json();
      const { id, cicli, codearq, nombre, tipo, inicio, final, imagen } = body;
      const dateInit = fechasConvert(inicio);
      const dateFin = fechasConvert(final);

      const editProyecto: MOD_PROYECTOS = {
        id,
        cicli,
        codearq,
        nombre,
        tipo,
        inicio: new Date(dateInit),
        final: new Date(dateFin),
        imagen,
        habilitado: 1,
      };

      const editProy = await putProyectos(editProyecto);

      if (editProy !== "success") {
        return new Response(JSON.stringify({ error: editProy }), {
          status: 400,
        });
      }

      return new Response(JSON.stringify({ message: "Proyecto actualizado" }), {
        status: 200,
      });
    } catch (err) {
      console.log("Error - PUT -handler: \n" + err);
      return new Response(
        JSON.stringify({ error: "Internal Server Error: \n" + err }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },

  //eliminar proyecto 
  async DELETE(req) {
    try {
      const body = await req.json();
      const id = body;

      const delProy = await deleteProyectos(id);

      if (delProy !== "success") {
        return new Response(JSON.stringify({ error: delProy }), {
          status: 400,
        });
      }

      return new Response(JSON.stringify({ message: "Proyecto eliminado" }), {
        status: 200,
      });
    } catch (err) {
      console.log("Error - DELETE -handler: \n" + err);
      return new Response(
        JSON.stringify({ error: "Internal Server Error: \n" + err }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};

const fechasConvert = (fecha: Date) => {
  const inicioDate = new Date(fecha);

  const formatted = inicioDate.toISOString().replace("T", " ").replace(
    "Z",
    " ",
  );

  return formatted;
};
