import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { imageFile } from "../../../lib/utils/formatImg.ts";
import { jsonSuccess } from "../../../lib/utils/response.ts";
import { convertTime, getTime } from "../../../lib/utils/timeFormat.ts";
import { delProy } from "../../../services/proyectos/delProy.ts";
import { uptProy } from "../../../services/proyectos/editProy.ts";
import { newProy } from "../../../services/proyectos/newProy.ts";
import { viewProy, viewProyIDUlt } from "../../../services/proyectos/viewProy.ts";

export const handler: Handlers = {
  /*--- metodo GET => obtener proyecto / proyectos ---*/
  async GET(req) {
    try {
      //constantes nevesarias
      const url = new URL(req.url);
      const idproy = parseInt(url.searchParams.get("id")?.toString() ?? "");
      const cookie = getCookies(req.headers);
      let id: string = "";

      //validar Cookie
      if (!cookie || !cookie.auth) {
        return jsonSuccess({ error: "No se encontró la cookie." }, 400);
      }
      const decodedAuth = await decodeURIComponent(cookie.auth);
      const authData = JSON.parse(decodedAuth);
      if (!authData || !authData.codigo) {
        return jsonSuccess({ error: "No se encontró el codigo." }, 400);
      }
      id = authData.codigo;

      //recuperar proyectos por id del usuario
      const result = idproy ? await viewProy(id, idproy) : await viewProy(id);

      //mandar respuesta al frontend
      if (result.length > 0) return jsonSuccess({ result: result }, 200);
      else return jsonSuccess({ message: "No se encontraron registros" }, 400);
    } catch (error) {
      console.log("ERROR al obtener proyectos view\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },

  /*--- metodo POST => nuevo proyecto ---*/
  async POST(req) {
    try {
      //constantes nevesarias
      const formData = await req.formData();
      const cookie = getCookies(req.headers);
      let id: string = "";

      //obtener datos => formData
      const data: Record<string, string | File> = {};
      formData.forEach((value, key) => {
        data[key] = value instanceof File && value.size > 0
          ? value
          : value.toString();
      });

      //validar Cookie
      if (!cookie || !cookie.auth) {
        return jsonSuccess({ error: "No se encontró la cookie." }, 400);
      }
      const decodedAuth = await decodeURIComponent(cookie.auth);
      const authData = JSON.parse(decodedAuth);
      if (!authData || !authData.codigo) {
        return jsonSuccess({ error: "No se encontró el codigo." }, 400);
      }else{
        id = authData.codigo;
      }

      const time = convertTime(data.iniproy?.toString() ?? getTime());

      //convertir imagen => base64
      const img64 = await imageFile(data.imgproy as File);
      
      //mandar registro => proyecto
      const result = await newProy({
        arq: id,
        cli: parseInt(data.cli?.toString()),
        nomproy: data.nomproy?.toString(),
        tipproy: data.tipproy?.toString(),
        iniproy: time,
        preproy: parseInt(data.preproy?.toString()),
        depproy: data.depproy?.toString(),
        dirproy: data.dirproy?.toString(),
        imgproy: img64,
      });

      //obtener ultima id
      const idProy = await viewProyIDUlt(id);
      const idP = idProy?.[0]?.id;
      //console.log(idProy);

      //mandar respuestas al frontend
      if (result.includes("OK")) {
        return jsonSuccess({tipo: "post",  message: "Registro completado", result: idP }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR al obtener proyectos new\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },

  /*--- metodo PUT => actualizacion proyectos ---*/
  async PUT(req) {
    try {
      //constantes nevesarias
      const formData = await req.formData();
      let img64: string = "";
      const url = new URL(req.url);
      const idproy = url.searchParams.get("idproy")?.toString() ?? "";

      //obtener datos => formData
      const data: Record<string, string | File> = {};
      formData.forEach((value, key) => {
        data[key] = value instanceof File && value.size > 0
          ? value
          : value.toString();
      });

      //recuperar o remplazar imagen
      const imgNew = data?.imgproy as File;
      const imgOld = data?.imgproyOld as string;

      if (imgNew.size > 0) img64 = await imageFile(imgNew);
      else img64 = imgOld;

      //mandar actualizacion => proyecto
      const result = await uptProy({
        id: parseInt(idproy),
        cli: parseInt(data.cli?.toString()),
        nomproy: data.nomproy?.toString(),
        tipproy: data.tipproy?.toString(),
        preproy: parseInt(data.preproy?.toString()),
        depproy: data.depproy?.toString(),
        dirproy: data.dirproy?.toString(),
        imgproy: img64,
      });

      //mandar respuesta al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Actualizacion Completada" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR al obtener proyectos upd\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },

  /*--- metodo DELETE => eliminar proyecto ---*/
  async DELETE(req) {
    try {
      //constantes nevesarias
      const url = new URL(req.url);
      const idproy = url.searchParams.get("idproy")?.toString() ?? "";

      //mandar eliminacion => proyectos
      const result = await delProy(parseInt(idproy));

      //mandar respuesta al frontend
      if (result.includes("OK")) {
        return jsonSuccess({ message: "Actualizacion Completada" }, 200);
      } else return jsonSuccess({ message: `ERROR. ${result}` }, 400);
    } catch (error) {
      console.log("ERROR al obtener proyectos del\n", error);
      return jsonSuccess({ message: `ERROR. ${error}` }, 400);
    }
  },
};
