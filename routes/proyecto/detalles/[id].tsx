import EstructuraPageMain from "../../../islands/pages/estructura.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import FormProy from "../../../islands/forms/formProy.tsx";
import CartFase from "../../../islands/pageProy/cartFase.tsx";
import CartPago from "../../../islands/pageProy/cartPago.tsx";
import CartDocumento from "../../../islands/pageProy/cartDocumento.tsx";

type CookieData = {
  codigo: string;
  isAllow: boolean;
  rol: string;
  nombre: string;
};

interface PageData extends CookieData {
  id: string;
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    const res = await fetch(`${ctx.url.origin}/api/cookieGet`, {
      headers: req.headers,
    });
    const data = await res.json();

    const id = ctx.params.id;

    return ctx.render({ ...data, id });
  },
};

export default function ProyDetalleHome({ data }: PageProps<PageData>) {
  return (
    <EstructuraPageMain
      page="other"
      nombre={data.nombre}
      isAllow={data.isAllow}
      rol={data.rol}
      codigo={data.codigo}
    >
      <div class="w-full flex lg:flex-row md:flex-col flex-col">
        <FormProy proy={data.id} arq={data.codigo.toString()} page="edt" />
        <div class="lg:w-1/2 md:w-full w-full flex lg:flex-col md:flex-col flex-col justify-between lg:ml-4">
          <CartFase proyid={data.id} />
          <CartPago proyid={data.id} />
        </div>
      </div>
      <div class="my-4">
        <CartDocumento proyid={data.id} />
      </div>
    </EstructuraPageMain>
  );
}
