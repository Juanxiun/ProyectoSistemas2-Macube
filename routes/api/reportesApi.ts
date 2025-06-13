import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../lib/utils/metodos/response.ts";
import { getReporteSaldo } from "../../services/reportes/reporteSaldo.ts";
import { getReporteFase } from "../../services/reportes/reporteFase.ts";
import { getReporteDepartamento } from "../../services/reportes/reporteDep.ts";
import { getReporteTipo } from "../../services/reportes/reporteTipo.ts";
import { generarReportePDF } from "../../services/reportes/reportePDF.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);
      const arq = url.searchParams.get("arq")?.toString() ?? "";
      const tipo = url.searchParams.get("tipo")?.toString() ?? "";

      if (!arq || !tipo) {
        return jsonSuccess({ error: "Faltan parámetros requeridos" }, 400);
      }

      let data = null;

      switch (tipo) {
        case "saldo":
          data = await getReporteSaldo(arq);
          break;
        case "fase":
          data = await getReporteFase(arq);
          break;
        case "departamento":
          data = await getReporteDepartamento(arq);
          break;
        case "tipo":
          data = await getReporteTipo(arq);
          break;
        case "descarga": {
          // Generar el PDF y devolver la URL base64
          const nombre = url.searchParams.get("nombre")?.toString() ?? "";
          const pdfUrl = await generarReportePDF(arq, nombre); // Implementa este método
          data = { url: pdfUrl };
          break;
        }
        default:
          return jsonSuccess({ error: "Tipo de reporte no válido" }, 400);
      }

      return jsonSuccess({ data }, 200);
    } catch (error) {
      console.log(error);
      return jsonSuccess({ error: `ERROR en reporteApi: ${error}` }, 400);
    }
  },
};
