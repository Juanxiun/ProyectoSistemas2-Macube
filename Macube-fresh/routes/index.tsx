import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Footer from "../islands/Footer.tsx";
import NavBar from "../islands/NavBar.tsx";
import ContMain from "../islands/PagInicio/ContMain.tsx";

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
  const session = data.isAllowed;
  const userdata = data.userdata;
  console.log(userdata);
  
  return (
    <div class="Index">
      <div class="Body">
        <NavBar isAllowed={session} ci={userdata} />

        <ContMain
          Title="MACUBE"
          Title2="DISEÑO Y ARTE"
          Text=" transformaremos tu sueño 
                  en un proyecto REAL combinando
                  diseño, arte y precision tecnica"
          Style="ArticlePres"
        />
      </div>

      <div class="Body1">
        <ContMain
          Title="BIENVENIDO"
          Text="Te acompañamos en cada etapa de tu obra, 
                brindando asesoramiento experto y soluciones eficientes. 
                Contamos con arquitectos de gran trayectoria, comprometidos 
                en hacer realidad tus ideas con calidad y precisión."
          Style="ArticleMid"
        />
      </div>

      <div class="Body1">
        <ContMain
          Title="CONTACTANOS"
          Text="contactanos en ... xd aun falta pipipi"
          Style="ArticleEnd"
        />

        <Footer />
      </div>
    </div>
  );
}
