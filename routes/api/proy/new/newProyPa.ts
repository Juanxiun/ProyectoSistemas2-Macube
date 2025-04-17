import { proyID } from "../../../../lib/services/projects/Create/proyNew.ts";
import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { proyPaNew } from "../../../../lib/services/projects/Create/proyPaNew.ts";
import { proyectoPaVal } from "../../../../lib/utils/validations/proy/proyectoPagVal.ts";

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const Cookies = getCookies(req.headers);

    try {
      const fechapag = formData.get("fechapag")?.toString() ?? "";
      const monto = formData.get("monto")?.toString() ?? "";
      const tipopago = formData.get("tipopago")?.toString() ?? "";
      const detalles = formData.get("detalles")?.toString() ?? "";
      const pagos = formData.get("precio")?.toString() ?? "";

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
      const valProy = await proyectoPaVal({
        monto: parseInt(monto),
        tipopago: tipopago,
        detalles: detalles,
        precio: parseInt(pagos),
      });

      if (valProy.includes("ERROR.")) {
        return new Response(JSON.stringify({ error: valProy }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      //llamar a nuestra api
      await proyPaNew({
        idpro: parseInt(idproy[0].id),
        fechapag: new Date(fechapag),
        monto: parseInt(monto),
        tipopago: tipopago,
        detalles: detalles,
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
