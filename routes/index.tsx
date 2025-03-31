import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { SiderBar } from "../islands/SiderBar.tsx";
import { NavBar } from "../islands/NavBar.tsx";


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
      <SiderBar userAllow={data.isAllowed} ci={data.userdata} />

      <div class="main-index-in">
        <NavBar isAllowed={data.isAllowed} ci={data.userdata} />

        <div className="main-index-a">

        </div>
      </div>
    </div>
  );
}
