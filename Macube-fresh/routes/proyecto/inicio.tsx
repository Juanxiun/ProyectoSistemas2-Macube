import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import NavBar from "../../islands/NavBar.tsx";
import SiderBar from "../../islands/SiderBar.tsx";
import DataUser from "../../lib/database/models/DataUser.ts";
import { Middleware } from "../../lib/utils/middleware.ts";

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

export default async function Inicio({ data }: PageProps<Data>) {

  if(!data){
    return(
      <>
        <meta http-equiv='refresh' content='0;url=/login'/>
      </>
    )
  }

  const session = data.isAllowed;
  const userdata = data.userdata;

  const _datox: DataUser[] = await fetchData(data.userdata);

  return (
    <div class="main">
      <div>
        <SiderBar userAllow={_datox[0]} />
      </div>

      <div class="cont-main">
        <div class="cont-main-b">
          <NavBar isAllowed={session} ci={userdata} />
        </div>
      </div>
    </div>
  );
}

const fetchData = async (codigo: number) => {
  let _data: DataUser[] = [];
  try {
    _data = await Middleware(codigo);
    //console.log(_data);
    return _data;
  } catch (error) {
    console.log(error);
  }

  return _data;
};
