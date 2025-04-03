import { useState } from "preact/hooks/";
import { Navlink } from "../components/NavLink.tsx";


interface datox {
  userAllow?: boolean;
  ci?: number;
  isUser?: "cli" | "arq";
}

export function SiderBar({ userAllow, ci, isUser }: datox) {
  const [rol, setRol] = useState<string | undefined>(undefined);
  console.log(ci);
  console.log(isUser)

  const setData = () => {
     userAllow? setRol(isUser) : setRol("")
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

        {rol === "arq" ? SiderInit() : rol === "cli"? SiderInitCli() : ("")}
      </div>
    </aside>
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

        <Navlink
          id="pro-ini"
          url="/proyectos/"
          text="LISTAR PROYECTOS"
          styleCls={`link-s `}
        />

        <Navlink
          id="pro-sel"
          url="/proyectos/create"
          text="CREAR PROYECTOS"
          styleCls={`link-s `}
        />

        <Navlink
          id="pro-fil"
          url="/proyecto/filtro"
          text="FILTRAR"
          styleCls={`link-s `}
        />

        <Navlink
          id="proy-doc"
          url="/proyecto/doc"
          text="DOCUMENTOS"
          styleCls={`link-s `}
        />

        <Navlink
          id="doc-insp"
          url="/proyecto/inspeccion"
          text="INSPECCIONES"
          styleCls={`link-s `}
        />
      </div>

      <div className="h-1/2 flex flex-col justify-center items-center">
        <h1 className="text-xl text-[#e4c36f]">OTROS</h1>
        <Navlink
          id="cli-re"
          url="/cliente/junta"
          text="REUNIONES"
          styleCls={`link-s `}
        />

      </div>

      <div className="h-1/2 flex flex-col justify-center items-center">
        <h1 className="text-xl text-[#e4c36f]">nueva data</h1>
      </div>
    </div>
  );
}



function SiderInitCli() {
  return (
    <div className="h-full flex flex-col justify-around ">
      <h2 className="text-xl text-center text-[#658895] my-6">
        CLIENTE
      </h2>
      <div className="h-full flex flex-col items-center justify-around">
        <h1 className="text-xl text-[#e4c36f]">PROYECTOS</h1>

        <Navlink
          id="pro-ini"
          url="/proyectos/"
          text="LISTAR PROYECTOS"
          styleCls={`link-s `}
        />

        <Navlink
          id="doc-insp"
          url="/proyecto/inspeccion"
          text="INSPECCIONES"
          styleCls={`link-s `}
        />
      </div>

      <div className="h-1/2 flex flex-col justify-center items-center">
        <h1 className="text-xl text-[#e4c36f]">OTROS</h1>
        <Navlink
          id="cli-re"
          url="/cliente/junta"
          text="REUNIONES"
          styleCls={`link-s `}
        />

      </div>

      <div className="h-1/2 flex flex-col justify-center items-center">
        <h1 className="text-xl text-[#e4c36f]">nueva data</h1>
      </div>
    </div>
  );
}
