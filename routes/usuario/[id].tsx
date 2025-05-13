import EstructuraPageMain from "../../islands/pages/estructura.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import FormUser from "../../islands/forms/formUser.tsx";

type CookieData = {
  codigo: string;
  isAllow: boolean;
  rol: string;
  nombre: string;
};

interface PageData extends CookieData {
  id: string;
}

export const handler: Handlers<CookieData> = {
  async GET(req, ctx) {
    const res = await fetch(`${ctx.url.origin}/api/cookieGet`, {
      headers: req.headers,
    });
    const data = await res.json();

    const id = ctx.params.id;

    return ctx.render({ ...data, id });
  },
};

export default function UserHome({ data }: PageProps<PageData>) {
  return (
    <EstructuraPageMain
      page="other"
      nombre={data.nombre}
      isAllow={data.isAllow}
      rol={data.rol}
      codigo={data.codigo}
    >
      <FormUser user={data.id} />
      
    </EstructuraPageMain>
  );
}
