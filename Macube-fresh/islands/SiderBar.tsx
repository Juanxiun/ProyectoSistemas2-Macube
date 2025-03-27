import { useState } from "preact/hooks/";
import DataUser from "../lib/database/models/DataUser.ts";
import { LikNav } from "../components/LinkNav.tsx";

interface _datox {
  userAllow?: DataUser;
}

export default function SiderBar({ userAllow }: _datox) {
  const [rol, setRol] = useState<string | undefined>(undefined);

  const setData = () => {
    if (userAllow != null) {
      setRol(userAllow.rol?.toString());
    } else {
      setRol("");
    }
  };

  setData();

  return (
    <aside class="SiderBar">
      <div class="SiderBar-I">
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
  const [active, setActive] = useState("somos"); // Inicia con "somos" seleccionado

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div
        className="flex flex-col space-y-2"
        onClick={(e) => {
          const id = (e.target as HTMLElement)?.id;
          if (id) setActive(id); 
        }}
      >
        <LikNav id="somos" url="#somos" text="QUIENES SOMOS" style={`link-s ${active === "somos" ? "border-b-2 border-white text-blue-500" : ""}`} />
        <LikNav id="trabajo" url="#trabajo" text="TRABAJOS" style={`link-s ${active === "trabajo" ? "border-b-2 border-white text-blue-500" : ""}`} />
        <LikNav id="cita" url="#cita" text="CREA UNA CITA" style={`link-s ${active === "cita" ? "border-b-2 white text-blue-500" : ""}`} />
      </div>
    </div>
  );
}







function SiderInit() {
  return (
    <div>
      <p>
        inicio sesion
      </p>
      {
        /*
      <div>

          <h1>
            {rol === "" ? ("") : rol === "arq" ? "ARQUITECTO" : "CLIENTE"}
          </h1>
          <h2>
            {}
          </h2>
        </div>

        <div>
          <h1>PROYECTOS</h1>
          <LikNav url="/" text="VER PROYECTOS" style="link-s" />
          <LikNav url="/" text="SELECCIONAR" style="link-s" />
          <LikNav url="/" text="OPCIONES" style="link-s" />

          {rol === "arq"
            ? <LikNav url="/" text="REGISTRAR" style="link-s" />
            : ("")}
          {rol === "arq"
            ? <LikNav url="/" text="FILTRAR" style="link-s" />
            : ("")}
        </div>

        <div>
          <h1>CUENTA</h1>
          <LikNav url="/" text="CONFIGURACIONES" style="link-s" />
          <LikNav url="/" text="CERRAR SESIOM" style="link-s" />
        </div>*/
      }
    </div>
  );
}
