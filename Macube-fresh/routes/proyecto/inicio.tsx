import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import NavBar from "../../islands/NavBar.tsx";
import SiderBar from "../../islands/SiderBar.tsx";
import DataUser from "../../lib/database/models/DataUser.ts";
import { Middleware } from "../../lib/utils/middleware.ts";

interface Data {
  isAllowed: boolean;
  authValue: number; 
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);

    
    const authCookie = cookies.auth ? decodeURIComponent(cookies.auth) : "{}";

    let ci = 0;

    try {
      
      const authData = JSON.parse(authCookie);
      ci = authData.ci ? parseInt(authData.ci, 10) : 0; 
    } catch (error) {
      console.log("Error al parsear la cookie 'auth':", error);
    }

    
    const isAllowed = ci !== 0; 

    return ctx.render({ authValue: ci, isAllowed });
  },
};

export default function Inicio({ data }: PageProps<Data>) {
  const ci: number = data.authValue;
  fetchData(ci);
  console.log(ci);

  return (
    <div class="main-index">
      <SiderBar userAllow={data.isAllowed} ci={ci} />
 

      <div class="main-index-in">
        <NavBar isAllowed={data.isAllowed} ci={ci} />
        <div class="main-index-a">
          
        </div>
      </div>
    </div>
  );
}

const fetchData = async (codigo: number) => {
  let _data: DataUser[] = [];
  try {
    _data = await Middleware(codigo);
    return _data;
  } catch (error) {
    console.log("Error en fetchData:", error);
  }
  return _data;
};
