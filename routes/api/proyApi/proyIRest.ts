import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../../lib/utils/response.ts";
import { uptProyI } from "../../../services/proyectos/editProy.ts";
import { newProyI } from "../../../services/proyectos/newProy.ts";
import { viewProyI } from "../../../services/proyectos/viewProy.ts";

export const handler: Handlers = {
  /*--- metodo GET => obtener proyecto / proyectos ---*/
  async GET(req) {
    try {
      //constantes nevesarias
      const url = new URL(req.url);
      const idproy = url.searchParams.get("idproy")?.toString() ?? "";

      //recuperar por id del proyecto
      const result = await viewProyI(parseInt(idproy));

      //mandar respuesta al frontend
      if (result.length > 0) return jsonSuccess({ data: result }, 200);
      else return jsonSuccess({ message: "No se encontraron registros" }, 400);
    } catch (error) {
      console.log("ERROR al obtener inspecciones\n", error);
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

      //mandar registro => proyecto In
      const result = await newProyI({
        proy: parseInt(idproy),
        tipins: data.tipins.toString(),
        desins: data.desins.toString(),
        fecins: data.fecins.toString(),
        estins: 1,
      });

      //mandar respuestas al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Registro completado" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR inspecciones new\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },

  /*--- metodo PUT => actualizacion proyectos ---*/
  async PUT(req) {
    try {
      //constantes nevesarias
      const formData = await req.formData();
      const url = new URL(req.url);
      const idproyI = url.searchParams.get("idproyI")?.toString() ?? "";
      //obtener datos => formData
      const data: Record<string, string | File> = {};
      formData.forEach((value, key) => {
        data[key] = value instanceof File && value.size > 0
          ? value
          : value.toString();
      });

      //mandar actualizacion => proyectos In
      const result = await uptProyI({
        id: parseInt(idproyI),
        tipins: data.tipins.toString(),
        desins: data.desins.toString(),
        fecins: data.fecins.toString(),
        estins: parseInt(data.estins.toString()),
      });

      //mandar respuesta al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Actualizacion Completada" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR inspecciones upt\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },
};
