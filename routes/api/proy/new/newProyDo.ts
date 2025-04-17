import { proyID } from "../../../../lib/services/projects/Create/proyNew.ts";
import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { proyDoNew } from "../../../../lib/services/projects/Create/proyDoNew.ts";
import { proyectoDoVal } from "../../../../lib/utils/validations/proy/proyectoDocVal.ts";

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const Cookies = getCookies(req.headers);

    try {
      const nombredoc = formData.get("nombredoc")?.toString() ?? "";
      const tipodoc = formData.get("tipodoc")?.toString() ?? "";
      const publicado = formData.get("publicado")?.toString() ?? "";
      const archivo = formData.get("archivo") as File | null;
      const descripcion = formData.get("descripcion")?.toString() ?? "";
      let codearq = "";

      //recuperar el codigo del arquitecto logueado
      const decodeAuth = decodeURIComponent(Cookies.auth);
      const authData = JSON.parse(decodeAuth);

      if (authData?.codigo) {
        codearq = authData.codigo;
      }

      //convertir pdf u otro documento en un archivo en base 64
      const arrayBuffer = await archivo?.arrayBuffer();
      const binary = arrayBuffer
        ? new Uint8Array(arrayBuffer)
        : new Uint8Array();
      let binaryStr = "";
      for (let i = 0; i < binary.length; i++) {
        binaryStr += String.fromCharCode(binary[i]);
      }
      const base64Data = btoa(binaryStr);

      //llamar al proyecto segun el codigo de nuestro arq
      const idproy = await proyID(codearq);

      // Validar
      const valProy = await proyectoDoVal({
        nombredoc: nombredoc,
        tipodoc: tipodoc,
        archivo: base64Data,
        descripcion: descripcion
      });

      if (valProy.includes("ERROR.")) {
        return new Response(JSON.stringify({ error: valProy }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      //llamar a nuestra api
      await proyDoNew({
        idpro: idproy,
        nombredoc: nombredoc.toLowerCase(),
        tipodoc: tipodoc.toLowerCase(),
        publicado: new Date(publicado),
        archivo: base64Data,
        descripcion: descripcion.toLowerCase(),
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
