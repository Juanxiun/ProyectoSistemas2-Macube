import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../../lib/utils/response.ts";
import { uptProyD } from "../../../services/proyectos/editProy.ts";
import { newProyD } from "../../../services/proyectos/newProy.ts";
import { viewProyD } from "../../../services/proyectos/viewProy.ts";

export const handler: Handlers = {
  /*--- metodo GET => obtener proyecto / proyectos ---*/
  async GET(req) {
    try {
      //constantes nevesarias
      const url = new URL(req.url);
      const idproy = url.searchParams.get("idproy")?.toString() ?? "";

      //recuperar por id del proyecto
      const result = await viewProyD(parseInt(idproy));

      //mandar respuesta al frontend
      if (result.length > 0) return jsonSuccess({ data: result }, 200);
      else return jsonSuccess({ message: "No se encontraron registros" }, 400);
    } catch (error) {
      console.log("ERROR al obtener documentos view\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },

  /*--- metodo POST => nuevo proyecto ---*/
  async POST(req) {
    try {
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

      //mandar registro => proyecto Doc
      const result = await newProyD({
        proy: parseInt(idproy),
        nomdoc: data.nomdoc.toString(),
        tipdoc: data.tipdoc.toString(),
        arcdoc: data.arcdoc.toString(),
        pubdoc: data.pubdoc.toString(),
      });

      //mandar respuestas al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Registro completado" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR documentos new\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },

  /*--- metodo PUT => actualizacion proyectos ---*/
  async PUT(req) {
    try {
      //constantes nevesarias
      const formData = await req.formData();
      const url = new URL(req.url);
      const idproyI = url.searchParams.get("idproyD")?.toString() ?? "";
      //obtener datos => formData
      const data: Record<string, string | File> = {};
      formData.forEach((value, key) => {
        data[key] = value instanceof File && value.size > 0
          ? value
          : value.toString();
      });

      //mandar actualizacion => proyectos Doc
      const result = await uptProyD({
        id: parseInt(idproyI),
        nomdoc: data.nomdoc.toString(),
        tipdoc: data.tipdoc.toString(),
        arcdoc: data.arcdoc.toString(),
      });

      //mandar respuesta al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Actualizacion Completada" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR docuemntos upt\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },
};
