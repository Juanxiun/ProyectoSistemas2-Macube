import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../../lib/utils/response.ts";
import { uptProyP } from "../../../services/proyectos/editProy.ts";
import { newProyP } from "../../../services/proyectos/newProy.ts";
import { viewProyP, viewProy } from "../../../services/proyectos/viewProy.ts";

export const handler: Handlers = {
  /*--- metodo GET => obtener proyecto / proyectos ---*/
  async GET(req) {
    try {
      //constantes necesarias
      const url = new URL(req.url);
      const idproy = url.searchParams.get("idproy")?.toString() ?? "";
      let precioProy = null;

      // Recuperar pagos del proyecto
      const result = await viewProyP(parseInt(idproy));

      // Recuperar datos del proyecto para obtener el precio
      const proyecto = await viewProy(undefined, parseInt(idproy));
      if (Array.isArray(proyecto) && proyecto.length > 0 && proyecto[0]?.preproy !== undefined) {
        precioProy = proyecto[0].preproy?.toString();
      }

      if (result.length > 0) return jsonSuccess({ precio: precioProy, data: result }, 200);
      else return jsonSuccess({ message: "No se encontraron registros" }, 400);
    } catch (error) {
      console.log("ERROR al obtener pagos\n", error);
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
      const result = await newProyP({
        proy: parseInt(idproy),
        tippag: data.tippag.toString(),
        despag: data.despag.toString(),
        monpag: parseInt(data.monpag.toString()),
        fecpag: data.fecpag.toString(),
      });

      //mandar respuestas al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Registro completado" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR pagos new\n", error);
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
      const result = await uptProyP({
        id: parseInt(idproyI),
        tippag: data.tippag?.toString(),
        despag: data.despag?.toString(),
        monpag: parseInt(data.monpag.toString()),
      });

      //mandar respuesta al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Actualizacion Completada" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR pagos upt\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },
};
