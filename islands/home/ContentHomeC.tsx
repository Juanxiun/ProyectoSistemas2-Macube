import { ImageElement } from "../../components/element/ImageElement.tsx";
import { TitleComp } from "../../components/ui/TitleComp.tsx";
import { TextComp } from "../../components/ui/TextComp.tsx";

export function ContentHomeC() {
  return (
    <article class="contenthomec">
      <div class="contenthomec_title">
        <TitleComp title="CONTACTANOS" styleCls="contenthomec_title-xl" />
        <TextComp text="te esperamos en nuestras oficinas o contactanos" styleCls="contenthomec_subtitle" />
        <div class="contenthomec_div">

        </div>
      </div>
      <div class="contenthomec_img">
        <ImageElement url1="/img/imagenMenu.jpg" url2="/img/imagenMenu.jpg" />
      </div>
    </article>
  );
}
