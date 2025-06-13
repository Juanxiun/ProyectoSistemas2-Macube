import { Handlers } from "$fresh/server.ts";
import { codGenerador } from "../../../lib/message/codGen.ts";
import { jsonSuccess } from "../../../lib/utils/metodos/response.ts";
import { MandarCodigo } from "../../../services/email/codigo/mandarCod.ts";
import { codigoCorrectoEmail } from "../../../services/email/codigo/validarCod.ts";
import { dropCodigoEmail } from "../../../services/verificacion/delVer.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const formData = await req.formData();

      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      const name = data.nameUsr ?? "";
      const email = data.emailUsr ?? "";
      const idArq = data.idArq ?? "";
      const codigo = codGenerador();

      const mandarMsj = await MandarCodigo({
        id: idArq,
        nombre: name,
        email: email,
        codigo: codigo,
      });

      if (mandarMsj !== "OK") return jsonSuccess({ error: mandarMsj }, 400);

      return jsonSuccess({ res: "OK" }, 200);
    } catch (e) {
      console.log(e);
      return jsonSuccess({ error: e }, 400);
    }
  },

  async PUT(req) {
    try {
      const formData = await req.formData();

      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      const email = data.emailUsr ?? "";
      const codigo = data.codUsr ?? "";

      const valCod = await codigoCorrectoEmail(email, codigo);

      if(valCod !== "OK") return jsonSuccess({error: valCod}, 400);

      await dropCodigoEmail(email);
      return jsonSuccess({res: "OK"}, 200);

    } catch (e) {
      console.log(e);
      return jsonSuccess({ error: e }, 400);
    }
  },
};
