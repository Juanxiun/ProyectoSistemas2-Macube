import { Handlers } from "$fresh/server.ts";
import { proyPaEdit } from "../../../../lib/services/projects/Update/proyPaEdit.ts";

export const handler: Handlers = {
  async PUT(req) {
    const formData = await req.formData();

    try {
      const idproy = formData.get("idproy")?.toString() ?? "";
      const monto = formData.get("monto")?.toString() ?? "";
      const tipopago = formData.get("tipopago")?.toString() ?? "";
      const detalles = formData.get("detalles")?.toString() ?? "";
      
      await proyPaEdit({
        idpro: parseInt(idproy),
        monto: parseInt(monto),
        tipopago: tipopago,
        detalles: detalles
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
