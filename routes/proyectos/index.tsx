import { NavBar } from "../../islands/layout/NavBar.tsx";
import { SiderBar } from "../../islands/layout/SiderBar.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { ProyView } from "../../islands/proyecto/ProyView.tsx";

interface dataProps {
  isAllow: boolean | false;
  codigo: string | number;
  rol: "arq" | "cli";
  nombre: string | "";
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const Cookies = getCookies(req.headers);

    let codigo = 0;
    let isAllow = false;
    let rol = "";
    let nombre= "";

    if (Cookies.auth) {
      try {
        const decodedAuth = await decodeURIComponent(Cookies.auth);
        const authData = JSON.parse(decodedAuth);

        if (authData && authData.codigo && authData.rol) {
          codigo = authData.codigo;
          isAllow = true;
          rol = authData.rol;
          nombre = authData.nombre;
        }
      } catch (error) {
        console.log("Error al autenticar la cookie:\n", error);
      }
    }
    return ctx.render({
      isAllow,
      codigo,
      rol,
      nombre,
    });
  },
};

export default function ProyectosHome({data} : PageProps<dataProps>) {
  return (
    <main class="h-screen w-screen flex flex-row justify-between py-4 px-2">
      <div class="h-full w-64 py-2 px-4">
        <SiderBar isAllow={data.isAllow} rol={data.rol} />
      </div>

      <div class="h-full w-full flex flex-col pl-10">
        <div class="h-32  w-full relative pt-3">
          <NavBar isAllow={data.isAllow} nombre={data.nombre} page="proy"/>
        </div>

        <main class="h-full w-full overflow-auto rounded-b-3xl">
            <ProyView/>
        </main>
      </div>
    </main>
  );
}
