import EstructuraPageMain from "../../islands/pages/estructura.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import FormUser from "../../islands/forms/formUser.tsx";
import FormNewPass from "../../islands/forms/formNewPass.tsx";

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
      <div class="w-full flex flex-col justify-evenly align-middle items-center">
        <FormUser user={data.id} />
        <div class="w-full h-2/3 my-5 flex justify-center align-middle items-center">
          <FormNewPass id={data.id} />
        </div>
      </div>

      <div class="py-5">
        <a href="/sesion/logout" class="bg-red-600 px-4 py-2 my-4 rounded-lg">
          Cerrar Sesion
        </a>
      </div>
    </EstructuraPageMain>
  );
}
