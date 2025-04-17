import { DetailElement } from "../../components/element/DetailElement.tsx";

interface sideProps {
  isAllow: boolean;
  rol?: "arq" | "cli";
}

export function SiderBar({ isAllow, rol }: sideProps) {

  const hanlderExit = () => {
    globalThis.location.href = "/session/logout/"
  }

  return (
    <aside class="siderbar">
      <div class="siderbar_logo">
        <img src="/favicon/logo.svg" alt="" />
        {
          <p class="text-center text-2xl text-white">
            {rol === "arq" ? "arquitecto" : rol === "cli" ? "cliente" : ""}
          </p>
        }
      </div>

      {isAllow
        ? (
          <div class="siderbar_opt">
            <DetailElement
              id="details"
              summary="proyectos"
              aditional="/favicon/actions/proyectos.svg"
              link={[
                { url: "/proyectos/", text: "ver" },
                ...(rol === "arq"
                  ? [{ url: "/proyectos/create", text: "registrar" }]
                  : []),
                { url: "/proyectos/", text:"progreso"},
                { url: "/proyectos/end", text:"terminados"},
              ]}
            />

            <DetailElement
              id="details"
              summary="reuniones"
              aditional="/favicon/actions/reunion.svg"
              link={[
                { url: "/reunion/", text: "ver" },
                { url: "/reunion/new", text: "programas" },
              ]}
            />

            <DetailElement
              id="details3"
              summary="adicional"
              aditional="/favicon/actions/message.svg"
              link={[
                { url: "/juntas/message", text: "bandeja" },
                { url: "/proyectos/doc", text: "documentos" },
                { url: "/proyectos/est", text: "estado" },
                ...(rol === "arq"
                  ? [{ url: "/arquitecto/estadistica", text: "ganancias" }]
                  : []),
              ]}
            />
          </div>
        )
        : ("")}

      {isAllow
        ? (
          <div class="siderbar_log " onClick={hanlderExit}>
            <img src="/favicon/actions/exit.svg" alt="" />
          </div>
        )
        : ("")}
    </aside>
  );
}
