import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { jsonSuccess } from "../../lib/utils/response.ts";

export const handler: Handlers = {
  async GET(req) {
    let codigo = 0;
    let isAllow = false;
    let rol = "";
    let nombre = "";

    const Cookies = await getCookies(req.headers);

    if (Cookies.auth) {
      try {
        const decodAuth = decodeURIComponent(Cookies.auth);
        const authData = JSON.parse(decodAuth);

        if (authData?.codigo && authData?.rol && authData?.nombre) {
          codigo = authData.codigo;
          isAllow = true;
          rol = authData.rol;
          nombre = authData.nombre;
        }
      } catch (err) {
        return jsonSuccess({ message: `ERROR. ${err}` }, 500);
      }
    }
    return new Response(
      JSON.stringify({
        codigo,
        isAllow,
        rol,
        nombre,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  },
};
