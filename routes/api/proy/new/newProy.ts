import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { proyID, proyNew } from "../../../../lib/services/projects/Create/proyNew.ts";
import { proyectoVal } from "../../../../lib/utils/validations/proy/proyectoVal.ts";

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const Cookies = getCookies(req.headers);

    try {
      const cicli = formData.get("cicli")?.toString() ?? "";
      const nombre = formData.get("nombre")?.toString() ?? "";
      const tipo = formData.get("tipo")?.toString() ?? "";
      const precio = formData.get("precio")?.toString() ?? "";
      const inicio = formData.get("inicio")?.toString() ?? "";
      const file = formData.get("imagen") as File;
      const direccion = formData.get("direccion")?.toString() ?? "";
      let codearq = "";

      const decodeAuth = decodeURIComponent(Cookies.auth);
      const authData = JSON.parse(decodeAuth);

      if (authData?.codigo) {
        codearq = authData.codigo;
      }

      console.log(cicli+" "+nombre +" "+tipo+" " + precio + " "+ codearq + " " + inicio + " " + file)

      //converti imagen
      const buffer = await file.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(buffer)));

      // Validar
      const valProy = await proyectoVal({
        cicli: parseInt(cicli),
        nombre: nombre,
        tipo: tipo,
        precio: parseInt(precio),
        inicio: new Date(inicio),
        imagen: base64Image,
        direccion: direccion,
      });

      if (valProy.includes("ERROR.")) {
        return new Response(JSON.stringify({ error: valProy }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      await proyNew({
        cicli: parseInt(cicli),
        codearq: codearq,
        nombre: nombre,
        tipo: tipo,
        precio: parseInt(precio),
        inicio: new Date(inicio),
        imagen: base64Image,
        direccion: direccion,
      });

      const idproy = await proyID(codearq);
      
      const id = idproy?.[0]?.id;
      console.log(id);

      return new Response(
        JSON.stringify({ success: true, codeproy: id,  message: "Registro exitoso" }),
        { status: 200 },
      );

    } catch (error) {
      console.error("Error en registro:", error);
      return new Response(
        JSON.stringify({ error: "Error al registrar." + error }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
