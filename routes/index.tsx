import EstructuraPageMain from "../islands/pages/estructura.tsx";
import FormLogin from "../islands/forms/formLogin.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

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
      <FormLogin />
    </EstructuraPageMain>
  );
}
