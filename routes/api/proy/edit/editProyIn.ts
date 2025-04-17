import { Handlers } from "$fresh/server.ts";
import { proyInEdit } from "../../../../lib/services/projects/Update/proyInEdit.ts";

export const handler: Handlers = {
  async PUT(req) {
    const formData = await req.formData();

    try {
      const idproy = formData.get("idproy")?.toString() ?? "";
      const asunto = formData.get("asunto")?.toString() ?? "";
      const detalles = formData.get("detalles")?.toString() ?? "";
      const fechains = formData.get("fechains")?.toString() ?? "";
      const estado = formData.get("estado")?.toString() ?? "";
      
    
      await proyInEdit({
        idpro: parseInt(idproy),
        asunto: asunto,
        detalles: detalles,
        fechains: new Date(fechains),
        estado: estado
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
