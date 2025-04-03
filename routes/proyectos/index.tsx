import { NavBar } from "../../islands/NavBar.tsx";
import { SiderBar } from "../../islands/SiderBar.tsx";
import { ProyView } from "../../islands/ProyView.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

interface Data {
  isAllowed: boolean;
  userdata: number;
  userRol: "cli" | "arq";
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);

    let userdata = 0;
    let isAllowed = false;
    let userRol = "";

    if (cookies.auth) {
      try {
        const decodedAuth = decodeURIComponent(cookies.auth);
        const authData = JSON.parse(decodedAuth);

        if (authData && authData.ci && authData.tipo) {
          userdata = authData.ci;
          isAllowed = true;
          userRol = authData.tipo;
        }
      } catch (error) {
        console.log("Error parsing auth cookie:", error);
      }
    }

    return ctx.render({
      isAllowed,
      userdata,
      userRol,
    });
  },
};

export default function ProyHome({ data } : PageProps<Data>) {

  
  return (
    <main class="main-index">
      <SiderBar userAllow ci={data.userdata} isUser={data.userRol}/>

      <div class="main-index-in">
        <div class="fixed w-full">
          <NavBar isAllowed />
        </div>
        <div class="main-index-a">
          <div class="main-index-a-count">
            <ProyView />
          </div>
        </div>
      </div>
    </main>
  );
}
