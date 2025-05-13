import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../../lib/utils/response.ts";
import { uptProyF } from "../../../services/proyectos/editProy.ts";
import { newProyF } from "../../../services/proyectos/newProy.ts";
import { viewProyF } from "../../../services/proyectos/viewProy.ts";

export const handler: Handlers = {
  /*--- metodo GET => obtener proyecto / proyectos ---*/
  async GET(req) {
    try {
      //constantes nevesarias
      const url = new URL(req.url);
      const idproy = url.searchParams.get("idproy")?.toString() ?? "";

      //recuperar por id del proyecto
      const result = await viewProyF(parseInt(idproy));


      //mandar respuesta al frontend
      if (result.length > 0) return jsonSuccess({ result: result }, 200);
      else return jsonSuccess({ message: "No se encontraron registros" }, 400);
    } catch (error) {
      console.log("ERROR al obtener fases\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },

  /*--- metodo POST => nuevo proyecto ---*/
  async POST(req) {
    try {
      console.log("post fase")
      //constantes nevesarias
      const formData = await req.formData();
      const url = new URL(req.url);
      const idproy = url.searchParams.get("idproy")?.toString() ?? "";

      //obtener datos => formData
      const data: Record<string, string | File> = {};
      formData.forEach((value, key) => {
        data[key] = value instanceof File && value.size > 0
          ? value
          : value.toString();
      });

      console.log(idproy, " ", data.tipfas, " ", data.nomfas, " ", data.fecfas  )
      //mandar registro => proyecto Doc
      const result = await newProyF({
        proy: parseInt(idproy),
        tipfas: data.tipfas?.toString(),
        nomfas: data.nomfas?.toString(),
        fecfas: data.fecfas?.toString(),
      });

      //mandar respuestas al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Registro completado" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR fases new\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },

  /*--- metodo PUT => actualizacion proyectos ---*/
  async PUT(req) {
    try {
      //constantes nevesarias
      const formData = await req.formData();
      const url = new URL(req.url);
      const idfase = url.searchParams.get("idproy")?.toString() ?? "";
      //obtener datos => formData
      const data: Record<string, string | File> = {};
      formData.forEach((value, key) => {
        data[key] = value instanceof File && value.size > 0
          ? value
          : value.toString();
      });

      console.log(idfase," ", data.tipfas, " ", data.nomfas)

      //mandar actualizacion => proyectos Doc
      const result = await uptProyF({
        id: parseInt(idfase),
        tipfas: data.tipfas?.toString(),
        nomfas: data.nomfas?.toString(),
      });

      //mandar respuesta al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Actualizacion Completada" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR fases upt\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },
};
