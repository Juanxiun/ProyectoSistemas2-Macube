import { NavBar } from "../../islands/layout/NavBar.tsx";
import { SiderBar } from "../../islands/layout/SiderBar.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { ProyViewID } from "../../islands/proyecto/viewID/ProyViewID.tsx";
import { ProyFaViewID } from "../../islands/proyecto/viewID/ProyFaViewID.tsx";
import { ProyPaViewID } from "../../islands/proyecto/viewID/ProyPaViewID.tsx";
 
interface dataProps {
  isAllow: boolean | false;
  codigo: string | number;
  rol: "arq" | "cli";
  nombre: string | "";
  proyid: string;
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const Cookies = getCookies(req.headers);

    let codigo = 0;
    let isAllow = false;
    let rol = "";
    let nombre = "";
    const proyid = ctx.params.view;

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
      proyid,
    });
  },
};

export default function ViewHome({ data }: PageProps<dataProps>) {
  return (
    <main class="h-screen w-screen flex flex-row justify-between py-4 px-2">
      <div class="h-full w-64 py-2 px-4">
        <SiderBar isAllow={data.isAllow} rol={data.rol} />
      </div>

      <div class="h-full w-full flex flex-col pl-10">
        <div class="h-32  w-full relative pt-3">
          <NavBar isAllow={data.isAllow} nombre={data.nombre}/>
        </div>

        <main class="h-full w-full overflow-auto rounded-b-3xl bg-[#c7c7c7]">
          <div class="w-full flex flex-row justify-between my-10">
            <ProyViewID id={parseInt(data.proyid)} rol={data.rol} />
            <div class="h-3/4 w-1/2 flex flex-col justify-around ">
              
              <div class="w-full h-2/5 px-10">
                <ProyFaViewID id={parseInt(data.proyid)} rol={data.rol} />
              </div>
              
              <div class="w-full h-2/5 px-4 py-10">
                <ProyPaViewID id={parseInt(data.proyid)} rol={data.rol}/>
              </div>

            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
