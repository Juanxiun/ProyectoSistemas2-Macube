import { proyID } from "../../../../lib/services/projects/Create/proyNew.ts";
import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { proyInNew } from "../../../../lib/services/projects/Create/proyInNew.ts";
import { proyectoInVal } from "../../../../lib/utils/validations/proy/proyectoInsVal.ts";

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const Cookies = getCookies(req.headers);

    try {
      const asunto = formData.get("asunto")?.toString() ?? "";
      const detalles = formData.get("detalles")?.toString() ?? "";
      const fechains = formData.get("fechains")?.toString() ?? "";
      const estado = formData.get("estado")?.toString() ?? "";

      let codearq = "";

      //recuperar el codigo del arquitecto logueado
      const decodeAuth = decodeURIComponent(Cookies.auth);
      const authData = JSON.parse(decodeAuth);

      if (authData?.codigo) {
        codearq = authData.codigo;
      }

      //llamar al proyecto segun el codigo de nuestro arq
      const idproy = await proyID(codearq);

      // Validar
      const valProy = await proyectoInVal({
        asunto: asunto,
        detalles: detalles,
        estado: estado
      });

      if (valProy.includes("ERROR.")) {
        return new Response(JSON.stringify({ error: valProy }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      //llamar a nuestra api
      proyInNew({
        idpro: idproy,
        asunto: asunto,
        detalles: detalles,
        fechains: new Date(fechains),
        estado: estado,
      });

      return new Response(
        JSON.stringify({ success: true, message: "Registro exitoso" }),
        { status: 200 },
      );
    } catch (error) {
      console.error("Error en registro:", error);
      return new Response(
        JSON.stringify({ error: "Error al registrar. Intente nuevamente." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
