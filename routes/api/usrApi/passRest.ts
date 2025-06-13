import { Handlers } from "$fresh/server.ts";
import { codGenerador } from "../../../lib/message/codGen.ts";
import { jsonSuccess } from "../../../lib/utils/metodos/response.ts";
import { hashpassword } from "../../../lib/utils/passwordMet.ts";
import { valNewPass } from "../../../lib/utils/validation/passVal.ts";
import { codigoCorrecto } from "../../../services/email/codigo/validarCod.ts";
import {
  cambiarPass,
  enviarCodigo,
  passCodigo,
} from "../../../services/usuarios/newPass.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);
      const codigoUSR = url.searchParams.get("id")?.toString() ?? "";

      //verificar si tiene un codigo pendiente, si tiene quitarlo
      const valPassCodigo = await passCodigo(codigoUSR);

      if (valPassCodigo !== "OK") {
        return jsonSuccess({ error: valPassCodigo }, 400);
      }
      const codigo = codGenerador();

      //mandar codigo
      const codmsj = await enviarCodigo(codigoUSR, codigo);

      if (codmsj === "OK") {
        return jsonSuccess({ value: "OK" }, 200);
      } else {
        return jsonSuccess({ value: codmsj }, 400);
      }
    } catch (e) {
      console.log(e);
      return jsonSuccess(
        { error: `ERROR al cambiar la contraseña, ${e}` },
        400,
      );
    }
  },

  async POST(req) {
    try {
      const formData = await req.formData();

      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      //console.log(data);
      const idUsr = data.id_usr ?? "";
      const codigo = data.codigo_email ?? "";

      const codVal = await codigoCorrecto(idUsr, codigo);

      if (codVal === "OK") {
        return jsonSuccess({ res: "OK" }, 200);
      } else {
        return jsonSuccess({ res: codVal }, 400);
      }
    } catch (e) {
      console.log(e);
      return jsonSuccess(
        { error: `ERROR en el codigo, ${e}` },
        400,
      );
    }
  },

  async PUT(req) {
    try {
      const formData = await req.formData();

      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      const idUsr = data.pass_id_usr ?? "";
      const pass = data.pass_new ?? "";
      const pass_conf = data.pass_conf_new ?? "";

      if (pass !== pass_conf) {
        return jsonSuccess({ error: "Las contraseñas no coinciden" }, 400);
      }
      const hashpass = await hashpassword(pass);

      const passVal = await valNewPass(idUsr, hashpass);
      if (passVal !== "OK") {
        return jsonSuccess({ error: passVal }, 400);
      }
      
      const newPass = await cambiarPass(idUsr, hashpass);

      if (newPass === "OK") {
        return jsonSuccess({ res: "OK" }, 200);
      } else {
        return jsonSuccess({ error: newPass }, 400);
      }
    } catch (e) {
      console.log(e);
      return jsonSuccess(
        { error: `ERROR en el codigo, ${e}` },
        400,
      );
    }
  },
};




