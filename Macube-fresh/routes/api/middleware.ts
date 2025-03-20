import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export default async function usuario(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const cookies = getCookies(req.headers);

  if (cookies.auth) {
    try {
      ctx.state.user = JSON.parse(cookies.auth);
    } catch (error) {
      console.log(error);
      ctx.state.user = null;
    }
  } else {
    ctx.state.user = null;
  }
  return await ctx.next();
}
