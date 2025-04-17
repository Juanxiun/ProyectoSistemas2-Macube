import { proyID } from "../../../../lib/services/projects/Create/proyNew.ts";
import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { proyFaNew } from "../../../../lib/services/projects/Create/proyFaNew.ts";
import { proyectoFaVal } from "../../../../lib/utils/validations/proy/proyectoFasVal.ts";

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const Cookies = getCookies(req.headers);

    try {
      const fase = formData.get("fase")?.toString() ?? "";
      const descripcion = formData.get("descripcion")?.toString() ?? "";
      const fechafase = formData.get("fechafase")?.toString() ?? "";
      let codearq = "";

      
      //recuperar el codigo del arquitecto logueado
      const decodeAuth = decodeURIComponent(Cookies.auth);
      const authData = JSON.parse(decodeAuth);

      if (authData?.codigo) {
        codearq = authData.codigo;
      }

      //llamar al proyecto segun el codigo de nuestro arq
      const idproy = await proyID(codearq);

      console.log(idproy, " ", fase, " ", descripcion, " ", fechafase)
      // Validar
      const valProy = await proyectoFaVal({
        fase,
        descripcion
      });

      if (valProy.includes("ERROR.")) {
        return new Response(JSON.stringify({ error: valProy }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      //llamar a nuestra api
      await proyFaNew({
        idpro: parseInt(idproy[0].id),
        fase: fase.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        fechafase: new Date(fechafase),
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
