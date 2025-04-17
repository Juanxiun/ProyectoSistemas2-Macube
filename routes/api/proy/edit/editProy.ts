import { Handlers } from "$fresh/server.ts";
import { proyEdit } from "../../../../lib/services/projects/Update/proyEdit.ts";

export const handler: Handlers = {
  async PUT(req) {
    const formData = await req.formData();

    try {
      const idproy = formData.get("idproy")?.toString() ?? "";
      const nombre = formData.get("nombre")?.toString() ?? "";
      const tipo = formData.get("tipo")?.toString() ?? "";
      const precio = formData.get("precio")?.toString() ?? "";
      const file = formData.get("imagen") as File;
      const direccion = formData.get("direccion")?.toString() ?? "";


      console.log(idproy+" " + nombre +" " + tipo +" " +precio + " "+file)

      //converti imagen
      const buffer = await file.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(buffer)));

      
      await proyEdit({
        idproy: parseInt(idproy),
        nombre: nombre,
        tipo: tipo,
        precio: parseInt(precio),
        imagen: base64Image,
        direccion: direccion,
      })

      return new Response(
        JSON.stringify({ success: true, message: "ACTUALIZACION exitosa" }),
        { status: 200 },
      );

    } catch (error) {
      console.error("Error al actulizar:", error);
      return new Response(
        JSON.stringify({ error: "Error al actualizar. Intente nuevamente." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
