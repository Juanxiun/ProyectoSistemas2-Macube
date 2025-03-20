import NavBar from "../islands/NavBar.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

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

    if (!isAllowed) {
        const url = new URL(req.url);
        const baseUrl = url.origin; 
        return Response.redirect(`${baseUrl}/register`);
      }

    return ctx.render({
      isAllowed,
      userdata,
    });
  },
};

export default function ({ data }: PageProps<Data>) {
  const session = data.isAllowed;
  const userdata = data.userdata;
  console.log(userdata);
  return (
    <div>
      <NavBar isAllowed={session} ci={userdata}/>

      <p>
        en contruccion!!!
      </p>
    </div>
  );
}
