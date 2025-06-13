import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../../lib/utils/metodos/response.ts";
import { valProyDo } from "../../../lib/utils/validation/proyDVal.ts";
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
      if (result.length > 0) return jsonSuccess({ result: result }, 200);
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

      //convertir archivo a base64
      const archivo = data?.arcdoc as File;
      const myFile64 = await fileToBase64DataUrl(archivo);

      //validar datos
      const val = await valProyDo(
        data?.nomdoc.toString(),
        data?.tipdoc.toString(),
        myFile64,
        parseInt(idproy),
      );
      if (val !== "OK") return jsonSuccess({ message: val }, 400);

      //mandar registro => proyecto Doc
      const result = await newProyD({
        proy: parseInt(idproy),
        nomdoc: data?.nomdoc.toString(),
        tipdoc: data?.tipdoc.toString(),
        arcdoc: myFile64,
        pubdoc: data?.pubdoc.toString(),
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

async function fileToBase64DataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    console.log(file.type + " " + file.name);

    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1]; 
      const mimeType = getMimeTypeFromName(file.name);
      const dataUrl = `data:${mimeType};base64,${base64}`;
      resolve(dataUrl);
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file); 
  });
}



function getMimeTypeFromName(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf": return "application/pdf";
    case "png": return "image/png";
    case "jpg": return "image/jpg";
    case "jpeg": return "image/jpeg";
    case "doc": return "application/msword";
    case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls": return "application/vnd.ms-excel";
    case "xlsx": return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "dwg": return "application/octet-stream"; 
    case "dxf": return "image/vnd.dxf";    
    case "zip": return "application/zip";
    default: return "application/octet-stream"; 
  }
}
