import { ImageElement } from "../../components/element/ImageElement.tsx";
import { TitleComp } from "../../components/ui/TitleComp.tsx";
import { TextComp } from "../../components/ui/TextComp.tsx";

export function ContentHome() {
  return (
    <article class="contenthome">
      <div class="contenthome_title">
        <TextComp text="DISEÑO Y ARTE" styleCls="contenthome_subtitle" />
        <TitleComp title="MACUBE" styleCls="contenthome_title-xl" />
      </div>
      <div class="contenthome_img">
        <ImageElement url1="/img/imagenMenu.jpg" url2="/img/imagenMenu.jpg" />
      </div>
    </article>
  );
}
