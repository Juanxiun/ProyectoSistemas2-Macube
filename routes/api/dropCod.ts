import { Handlers } from "$fresh/server.ts";
import { jsonSuccess } from "../../lib/utils/metodos/response.ts";
import { dropCodigo } from "../../services/verificacion/delVer.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);
      const codigoUSR = url.searchParams.get("id")?.toString() ?? "";

      if (codigoUSR.length < 1) {
        return jsonSuccess({ res: "ERROR, al procesar el codigo" }, 400);
      }
      const result = await dropCodigo(codigoUSR);
      if (result !== "OK") return jsonSuccess({ res: result }, 400);

      return jsonSuccess({ res: "OK" }, 200);
    } catch (e) {
      console.log(e);
      return jsonSuccess({res: `ERROR, ${e}`}, 400)
    }
  },
};
