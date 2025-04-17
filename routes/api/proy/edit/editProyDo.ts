import { Handlers } from "$fresh/server.ts";
import { proyDoEdit } from "../../../../lib/services/projects/Update/proyDoEdit.ts";

export const handler: Handlers = {
  async PUT(req) {
    const formData = await req.formData();

    try {
      const idproy = formData.get("idproy")?.toString() ?? "";
      const nombredoc = formData.get("nombredoc")?.toString() ?? "";
      const tipodoc = formData.get("tipodoc")?.toString() ?? "";
      const archivo = formData.get("archivo") as File | null;
      const descripcion = formData.get("descripcion")?.toString() ?? "";

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

      await proyDoEdit({
        idpro: parseInt(idproy),
        nombredoc: nombredoc,
        tipodoc: tipodoc,
        archivo: base64Data,
        descripcion: descripcion
      });

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
