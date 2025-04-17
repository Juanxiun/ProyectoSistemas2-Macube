import { ImageElement } from "../../components/element/ImageElement.tsx";
import { TitleComp } from "../../components/ui/TitleComp.tsx";
import { TextComp } from "../../components/ui/TextComp.tsx";

export function ContentHomeP() {
  return (
    <article class="contenthomep">
      <div class="contenthomep_title">
        <TitleComp title="QUIENES SOMOS?" styleCls="contenthomep_title-xl" />
        <div class="contenthome_alp">
          <article class="contenthomep_ar">
            <TextComp text="PROFECIONALES" styleCls="contenthomep_subtitle" />
            <TextComp
              text="profecionales en el area de diseño, supervicion y creacion de proyectos, no esperes mas y deja la casa de tus sueños en manos de profecionales"
              styleCls="contenthomep_txt"
            />
          </article>
          <article class="contenthomep_ar">
            <TextComp text="CONFIABLES" styleCls="contenthomep_subtitle" />
            <TextComp
              text="años de experiencia diseñando todo tipo de proyectos, nosotros le daremos forma a sus sueños"
              styleCls="contenthomep_txt"
            />
          </article>
          <article class="contenthomep_ar">
            <TextComp text="CERTIFICADOS" styleCls="contenthomep_subtitle" />
            <TextComp
              text="certificaciones a nivel nacional eh internacional, ofrecemos un servicio de calidad y confiabilidada"
              styleCls="contenthomep_txt"
            />
          </article>
        </div>
      </div>
      <div class="contenthomep_img">
        <ImageElement url1="/img/imagenFondo2.jpg" url2="/img/imagenMenu.jpg" />
      </div>
    </article>
  );
}
