import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../lib/utils/metodos/response.ts";
import { verSolicitudes } from "../../services/solicitudes/verSolicitud.ts";
import { nuevaSolicitud } from "../../services/solicitudes/nuevaSolicitud.ts";

export const handler: Handlers = {

  async GET(req) {
    try {
      const url = new URL(req.url);
      const codigo = url.searchParams.get("codigo")?.toString() ?? "";
      const result = await verSolicitudes(codigo);
      return jsonSuccess({ data: result }, 200);
    } catch (error) {
      console.log("ERROR al obtener solicitudes\n", error);
      return jsonSuccess({ error: `ERROR. ${error}` }, 400);
    }
  },

  async POST(req) {
    try {
      const data = await req.json();
      const { tipo, solicitud, cli, arq } = data;
      if (!tipo || !solicitud || !cli || !arq) {
        return jsonSuccess({ error: "Faltan datos requeridos" }, 400);
      }
      const result = await nuevaSolicitud({ tipo, solicitud, cli, arq });
      if (result.ok) {
        return jsonSuccess({ message: result.message }, 200);
      } else {
        return jsonSuccess({ error: result.message }, 400);
      }
    } catch (error) {
      console.log("ERROR al registrar solicitud\n", error);
      return jsonSuccess({ error: `ERROR. ${error}` }, 400);
    }
  },
};