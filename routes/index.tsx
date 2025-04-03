import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { SiderBar } from "../islands/SiderBar.tsx";
import { NavBar } from "../islands/NavBar.tsx";
import CartPres from "../islands/CartPres.tsx";


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
        <div class="fixed w-full">
          <NavBar isAllowed={data.isAllowed} ci={data.userdata} />
        </div>

        <div class="main-index-a">
          <div class="main-index-a-count">
            <CartPres
              type="pres"
              titulo="MACUBE"
              titulo2="DISEÑO Y ARTE"
              styleType="pres"
              context="Bienvenido a macube donde CONVERTIMOS SUEÑOS EN PROYECTOS REALES"
            />
            <div class="pres-img">
              <img src="/img/Multimedia.webp" alt="/xd" />
            </div>
          </div>
          <div class="main-index-a-count">

            <p>
              sjakdhkas
            </p>

            <CartPres
              type="info"
              titulo="QUE REALIZAMOS"
              styleType="info"
              context="Te acompañamos en cada etapa de tu obra, 
                       brindando asesoramiento experto y soluciones eficientes."
            />
          </div>
          <div class="main-index-a-count">
            <CartPres
              type="cont"
              titulo="CONTACTANOS"
              styleType="cont"
              context="crea una sita o ve a nuestras redes sociales"
            />
            <div className="w-1/2 h-full flex align-middle justify-center items-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d402.0718950651475!2d-68.1746618373088!3d-16.51730764803232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915edfa7633c5789%3A0xeaf5714f0184d66f!2sEl%20Alto!5e0!3m2!1ses-419!2sbo!4v1743560472663!5m2!1ses-419!2sbo"
                width="600"
                height="450"
                style="border:0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
