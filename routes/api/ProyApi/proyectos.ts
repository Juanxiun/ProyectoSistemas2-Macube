import { Handlers } from "$fresh/server.ts";
import { MOD_PROYECTOS } from "../../../lib/database/models/proyectos/proyectoModel.ts";
import {
  deleteProyectos,
  getProyectos,
  postProyectos,
  putProyectos,
} from "../../../lib/services/proyecto/proyectoService.ts";
import { uint8ArrayToBase64 } from "../../../lib/utils/converFile.ts";

const onBase64 = (image: Uint8Array ) => {
  const decoder = new TextDecoder('utf8');
  const base64 = btoa(decoder.decode(image));
  const result = `data:image/jpeg;base64,${base64}`
  return result;
}

export const handler: Handlers = {
  //ver proyectos
  async GET(req) {
    try {
      const url = new URL(req.url);
      const id = Number(url.searchParams.get("id"));
  
      let proyectos: MOD_PROYECTOS[] = [];
      const proy = id && id > 0 ? await getProyectos(id) : await getProyectos();
  
      if (proy) {
        proyectos = proy.map(proyecto => ({
          ...proyecto,
          imagen: proyecto.imagen 
            ? typeof proyecto.imagen === 'object' 
              ? uint8ArrayToBase64(proyecto.imagen) 
              : proyecto.imagen
            : ""
        }));
      }
  
      return new Response(JSON.stringify(proyectos), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log("Error - GET -handler: \n" + err);
      return new Response(
        JSON.stringify({ error: "Internal Server Error: \n" + err }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  ,

  //crear proyectos
  async POST(req) {
    try {
      const body = await req.json();
      const { cicli, codearq, nombre, tipo, inicio, imagen} = body;

      //const dateInit = fechasConvert(inicio);
      //const dateFin = fechasConvert(final);
      
      const newProyecto: MOD_PROYECTOS = {
        id: 0,
        cicli,
        codearq,
        nombre,
        tipo,
        inicio,
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
        },
      );
    }
  },

  //editar proyecto
  async PUT(req) {
    try {
      const body = await req.json();
      const { id, nombre, tipo, inicio, imagen} = body;
      //const dateInit = fechasConvert(inicio);


      const editProyecto: MOD_PROYECTOS = {
        id,
        cicli: 0,
        codearq: "",
        nombre,
        tipo,
        inicio,
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
