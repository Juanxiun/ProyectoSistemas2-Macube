import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../../lib/utils/response.ts";
import { SearhProy } from "../../../services/proyectos/searchProy.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);
      const search = url.searchParams.get("q")?.toLowerCase() ?? "";

      if (!search || search.length < 3) {
        return jsonSuccess(
          { message: "La búsqueda debe tener al menos 3 caracteres." },
          400,
        );
      }

      const result = await SearhProy(search);

      if (!result || result.length === 0) {
        return jsonSuccess(
          { message: "No se encontraron proyectos que coincidan con la búsqueda." },
          404,
        );
      }

      return jsonSuccess({ data: result }, 200);
    } catch (error) {
      console.error("Error en la búsqueda de proyectos:", error);
      return jsonSuccess({ error: "Error interno del servidor." }, 500);
    }
  },
};