import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export async function handler(
    req: Request, ctx: MiddlewareHandlerContext
){

    const url = new URL(req.url);
    const pathname = url.pathname;
    
    //cookie
    let rol;
    const Cookie = await getCookies(req.headers);
    let authData = null;

    if (Cookie.auth) {
        try {
            const decodAuth = decodeURIComponent(Cookie.auth);
            authData = JSON.parse(decodAuth);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    if(authData?.rol) rol =  authData.rol

    if(authData?.rol) rol =  authData.rol

    //rutas protegidas
    const rutas: Record<string, string[]> = {
        "/usuario": ["cli", "arq"],
        "/proyecto": ["cli", "arq"],
    }

    for (const ruta in rutas) {
        if (pathname.startsWith(ruta)) {
            if (!rol || !rutas[ruta].includes(rol)) {
                const headers = new Headers();
                headers.set("location", "/");
                return new Response(null, {
                    status: 302,
                    headers,
                })
            }
        }
    }
    return await ctx.next();
    
}