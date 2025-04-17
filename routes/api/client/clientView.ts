import { Handlers } from "$fresh/server.ts";
import { viewCli } from "../../../lib/services/users/view.ts";

interface Cliente {
  cod: number;
  nombres: string;
  apellidos: string;
}

export const handler: Handlers = {
  async GET() {
    try {
      const clientesRaw = await viewCli();

      if (!Array.isArray(clientesRaw) || clientesRaw.length === 0) {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      // deno-lint-ignore no-explicit-any
      const result: Cliente[] = clientesRaw.map((cliente: any) => ({
        cod: cliente.ci,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
      }));

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    } catch (error) {
      console.error("Error en handler /api/client/clientView:", error);
      return new Response(
        JSON.stringify({
          error: "Error al obtener la lista de clientes. Por favor, intente nuevamente.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
