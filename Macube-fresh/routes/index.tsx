import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import NavBar from "../islands/NavBar.tsx";
import ContMain from "../islands/PagInicio/ContMain.tsx";
import SiderBar from "../islands/SiderBar.tsx";

interface Data {
  isAllowed: boolean;
  userdata: number;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);

    let userdata = 0;
    let isAllowed = false;

    if (cookies.auth) {
      try {
        const decodedAuth = decodeURIComponent(cookies.auth);
        const authData = JSON.parse(decodedAuth);

        if (authData && authData.ci) {
          userdata = authData.ci;
          isAllowed = true;
        }
      } catch (error) {
        console.log("Error parsing auth cookie:", error);
      }
    }

    return ctx.render({
      isAllowed,
      userdata,
    });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div class="main-index">
      <SiderBar />

      <div class="main-index-in">
        <NavBar isAllowed={data.isAllowed} ci={data.userdata} />
        <div class="main-index-b">
          <ContMain
            Title="MACUBE"
            Title2="DISEÑO Y ARTE"
            Text="transformaremos tu sueño 
                  en un proyecto REAL combinando
                  diseño, arte y precision tecnica"
            Style="ArticlePres"
          />

          <div
           class={`w-full h-full px-5 flex justify-center align-middle items-center `}>
            <img src="/images/Multimedia.webp" alt="xdxdxd" className={`h-full w-5/6`} />
          </div>

          <div>
            
          </div>

        </div>
      </div>
    </div>
  );
}
