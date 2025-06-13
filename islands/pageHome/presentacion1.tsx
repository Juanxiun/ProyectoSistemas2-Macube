import { ImagenTrans } from "../../components/Element/imageTrans.tsx";

export default function Presentacion1() {
  return (
    <>
      <div class="cont_main1">
        <div class="cont_main_t">
          <h1>MACUBE</h1>
          <div>
            <p>
              Desarrollaremos tu proyecto con la mejor calidad en el mercado y
              con el mejor equipo de trabajo.
            </p>
          </div>
        </div>
        <ImagenTrans/>
      </div>

      <div class="cont_main2">
        <div class="cont_main_t2">
          <div>
            <h1>EXPERTOS</h1>
          </div>
          <div>
            <p>
              Desarrollaremos tu proyecto con la mejor calidad en el mercado y
              con el mejor equipo de trabajo.
            </p>
          </div>
        </div>
        <div class="cont_main_i">
          <img src="/img/planoFN.png" alt="" />
        </div>
      </div>

      <div class="cont_main1">
        <div class="cont_main_t3">
          <h1>CONTACTOS</h1>
          <div>
            <p>
              Desarrollaremos tu proyecto con la mejor calidad en el mercado y
              con el mejor equipo de trabajo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
