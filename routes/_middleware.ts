// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export async function handler(req: Request, ctx: FreshContext) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const cookie = getCookies(req.headers);
  let rol = "";

  if(cookie.auth){
    const decodedAuth = await decodeURIComponent(cookie.auth);
    const authData = JSON.parse(decodedAuth);

    if (authData && authData.rol) {
      rol = authData.rol;
    }
  }
  
  const rutasProtegidas: Record<string, string[]> = {
    "/api/proy": ["arq", "cli"],
    "/arquitectos": ["arq"],
    "/proyectos": ["arq", "cli"],
  };

  for (const ruta in rutasProtegidas) {
    if (pathname.startsWith(ruta)) {
      const rolesPermitidos = rutasProtegidas[ruta];
      if (!rol || !rolesPermitidos.includes(rol)) {
        return new Response("Acceso denegado", { status: 403 });
      }
    }
  }

  return await ctx.next();
}
