import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import NavBar from "../../islands/NavBar.tsx";
import SiderBar from "../../islands/SiderBar.tsx";
import DataUser from "../../lib/database/models/DataUser.ts";
import { Middleware } from "../../lib/utils/middleware.ts";

interface Data {
  isAllowed: boolean;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAllowed: cookies.auth === "bar"})
  },
};

export default function Inicio({ data }: PageProps<Data>) { 

  console.log(data.isAllowed);

  return (
    <div class="main">
      <div>
        <SiderBar userAllow={data.isAllowed}  />
      </div>

      <div class="cont-main">
        <div class="cont-main-b">
          <NavBar isAllowed={data.isAllowed}  />
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
