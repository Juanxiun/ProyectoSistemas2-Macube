import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../../lib/utils/metodos/response.ts";
import { EmailMsj, telelMsj } from "../../../services/email/emailMsj.ts";
import { ContactosCall } from "../../../services/usuarios/contactos.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);
      const codigo = url.searchParams.get("id")?.toString() ?? "";

      const data = await ContactosCall(codigo);

      return jsonSuccess({ res: data }, 200);
    } catch (e) {
      console.log(e);
      return jsonSuccess({ error: e }, 400);
    }
  },

  async POST(req) {
    try {
      //variables necesarias
      const formData = await req.formData();
      //obtener de formulario
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      const tipomsj = data.metodo ?? "";
      const codigo = data.ciUsr ?? "";
      const correo = data.correoUsr ?? "";
      const telefono = data.telefonoUsr ?? "";
      const nombre = data.nombreUsr ?? "";
      const asunto = data.asunto ?? "";
      const contenido = data.contenido ?? "";

      const tipoMensajeM = tipomsj === "correo"
        ? await EmailMsj({
          codigo: codigo,
          correo: correo,
          nombre: nombre,
          asunto: asunto,
          contenido: contenido,
        })
        : await telelMsj({
          codigo: codigo,
          telefono: telefono,
          nombre: nombre,
          asunto: asunto,
          contenido: contenido,
        });

      if (tipoMensajeM !== "OK") {
        return jsonSuccess({ error: tipoMensajeM }, 400);
      }

      return jsonSuccess({ res: "OK" }, 200);
    } catch (e) {
      console.log(e);
      return jsonSuccess({ error: e }, 400);
    }
  },
};
