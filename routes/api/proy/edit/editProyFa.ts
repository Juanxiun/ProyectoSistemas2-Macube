import { Handlers } from "$fresh/server.ts";
import { proyFaEdit } from "../../../../lib/services/projects/Update/proyFaEdit.ts";

export const handler: Handlers = {
  async PUT(req) {
    const formData = await req.formData();

    try {
      const idproy = formData.get("idproy")?.toString() ?? "";
      const fase = formData.get("fase")?.toString() ?? "";
      const descripcion = formData.get("descripcion")?.toString() ?? "";
      
    
      await proyFaEdit({
        idpro: parseInt(idproy),
        fase: fase,
        descripcion: descripcion
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
