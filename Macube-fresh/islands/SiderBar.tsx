import { useState } from "preact/hooks/";
import { LikNav } from "../components/LinkNav.tsx";

interface datox {
  userAllow?: boolean;
  ci?: number;
}

export default function SiderBar({ userAllow, ci }: datox) {
  const [rol, setRol] = useState<string | undefined>(undefined);
  console.log(ci);

  const setData = () => {
    if (userAllow) {
      setRol("cli");
    } else {
      setRol("arq");
    }
  };

  setData();

  return (
    <aside class="SiderBar">
      <div id="somos" class="SiderBar-I">
        <div className="flex flex-col justify-center align-middle items-center">
          <div class="Sider-logo">
            <img src="/favicon/logo.svg" alt="fotoPrefil" />
          </div>

          <h1 className="text-white text-2xl text-center ">
            BIENVENIDO
          </h1>
        </div>

        {rol === "cli" ? SiderInit() : Siderindex()}
      </div>
    </aside>
  );
}

function Siderindex() {
  const [active, setActive] = useState("somos");

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div
        className="flex flex-col space-y-2"
        onClick={(e) => {
          const id = (e.target as HTMLElement)?.id;
          if (id) setActive(id);
        }}
      >
        <LikNav
          id="somos"
          url="#somos"
          text="QUIENES SOMOS"
          style={`link-s ${active === "somos" ? "link-s-m" : ""}`}
        />
        <LikNav
          id="trabajo"
          url="#trabajo"
          text="TRABAJOS"
          style={`link-s ${active === "trabajo" ? "link-s-m" : ""}`}
        />
        <LikNav
          id="cita"
          url="#cita"
          text="CREA UNA CITA"
          style={`link-s ${active === "cita" ? "link-s-m" : ""}`}
        />
      </div>
    </div>
  );
}

function SiderInit() {
  return (
    <div className="h-full flex flex-col justify-around ">
      <h2 className="text-xl text-center text-[#658895] my-6">
        CLIENTE
      </h2>
      <div className="h-full flex flex-col items-center justify-around">
        <h1 className="text-xl text-[#e4c36f]">PROYECTOS</h1>

        <LikNav
          id="pro-ini"
          url="/proyecto/inicio"
          text="VER PROYECTOS"
          style={`link-s `}
        />

        <LikNav
          id="pro-sel"
          url="/proyecto/select"
          text="SELECCIONAR"
          style={`link-s `}
        />

        <LikNav
          id="pro-fil"
          url="/proyecto/filtro"
          text="FILTRAR"
          style={`link-s `}
        />

        <LikNav
          id="proy-doc"
          url="/proyecto/doc"
          text="DOCUMENTOS"
          style={`link-s `}
        />

        <LikNav
          id="doc-insp"
          url="/proyecto/inspeccion"
          text="INSPECCIONES"
          style={`link-s `}
        />
      </div>

      <div className="h-1/2 flex flex-col justify-center items-center">
        <h1 className="text-xl text-[#e4c36f]">OTROS</h1>
        <LikNav
          id="cli-re"
          url="/cliente/junta"
          text="REUNIONES"
          style={`link-s `}
        />

      </div>

      <div className="h-1/2 flex flex-col justify-center items-center">
        <h1 className="text-xl text-[#e4c36f]">nueva data</h1>
      </div>
    </div>
  );
}
