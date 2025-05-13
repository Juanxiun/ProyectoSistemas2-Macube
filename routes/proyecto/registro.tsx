import EstructuraPageMain from "../../islands/pages/estructura.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import FormProy from "../../islands/forms/formProy.tsx";

type CookieData = {
  codigo: string;
  isAllow: boolean;
  rol: string;
  nombre: string;
};

export const handler: Handlers<CookieData> = {
  async GET(req, ctx) {
    const res = await fetch(`${ctx.url.origin}/api/cookieGet`, {
      headers: req.headers,
    });
    const data = await res.json();
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<CookieData>) {
  return (
    <EstructuraPageMain
      page="other"
      nombre={data.nombre}
      isAllow={data.isAllow}
      rol={data.rol}
      codigo={data.codigo}
    >
      <FormProy arq={data.codigo.toString()} page="new" />
    </EstructuraPageMain>
  );
}
