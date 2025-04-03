import { TitleComp } from "../components/TitleComp.tsx";
import { TextComp } from "../components/TextComp.tsx";
import { ContactoComp } from "../components/ContactoComp.tsx";

interface CartProps {
  type: string;
  titulo?: string;
  titulo2?: string;
  context: string;
  styleType?: string | "card-1";
}

export default function CartPres(
  { type, titulo, titulo2, context, styleType }: CartProps,
) {
  return (
    <article class={styleType}>
      {type === "pres"
        ? Presentation({
          _titulo: titulo,
          _titulo2: titulo2,
          _context: context,
        })
        : type === "info"
        ? infoArq({ _titulo: titulo, _context: context })
        : type === "cont"
        ? contArq({ _titulo: titulo, _context: context })
        : ("")}
    </article>
  );
}

const Presentation = (
  { _titulo, _titulo2, _context }: {
    _titulo?: string;
    _titulo2?: string;
    _context: string;
  },
) => {
  return (
    <div class="pres-card">
      <div className={`text-center`}>
        <TitleComp title={_titulo2} styleCls="pres-card-title2" />
        <TitleComp title={_titulo} styleCls="pres-card-title" />
      </div>

      <div class="pres-card-div-ctx">
        <TextComp text={_context} styleCls="pres-card-ctx" />
      </div>
    </div>
  );
};

const infoArq = (
  { _titulo, _context }: { _titulo?: string; _context?: string },
) => {
  return (
    <div class="info-card">
      <TitleComp title={_titulo} styleCls="info-card-titulo" />

      <div class="info-card-div-ctx">
        <TextComp text={_context} styleCls="info-card-ctx" />
      </div>
    </div>
  );
};

const contArq = (
  { _titulo, _context }: { _titulo?: string; _context?: string },
) => {
  return (
    <div class="cont-card">
      <TitleComp title={_titulo} styleCls="cont-card-title" />

      <div class="cont-card-div-ctx">
        <TextComp text={_context} styleCls="cont-card-ctx" />

        <div class="cont-card-div-data">
          <ContactoComp />
        </div>
      </div>
    </div>
  );
};
