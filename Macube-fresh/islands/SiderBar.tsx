import { useState } from "preact/hooks/";
import DataUser from "../lib/database/models/DataUser.ts";
import { LikNav } from "../components/LinkNav.tsx";

interface _datox{
  userAllow?  : DataUser
}

export default function SiderBar({userAllow} : _datox ) {
  const [rol, setRol] = useState<string | undefined>(undefined);

  const setData = () => {
    if(userAllow != null){
      setRol(userAllow.rol?.toString())
    }
    else{
      setRol("")
    }
  }

  setData()

  return (
    <aside class="SiderBar">
      <div class="SiderBar-I">
        <div>
          <img src="" alt="fotoPrefil" />
        </div>

        <div>
          <h1>BIENVENIDO</h1>
          <h1>
            {rol === ""
              ? ("")
              : rol === "arq"
              ? "ARQUITECTO"
              : "CLIENTE"}
          </h1>
          <h2>
            {
                
            }
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
        </div>
      </div>
    </aside>
  );
}
