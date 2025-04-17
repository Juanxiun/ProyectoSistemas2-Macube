import { useEffect, useState } from "preact/hooks/";
import { SearchElement } from "../../components/element/SearchElement.tsx";

interface navProps {
  isAllow: boolean;
  nombre?: string;
  page?: string;
}

export function NavBar({ isAllow, nombre, page }: navProps) {
  const [login, setLogin] = useState("");

  useEffect(() => {
    if (isAllow) {
      setLogin("cuenta");
    } else {
      setLogin("login");
    }
  }, [isAllow]);

  const handlerUrl = () => {
    if (isAllow) {
      globalThis.location.href = "/user/";
    } else {
      globalThis.location.href = "/session/login/";
    }
  };

  const handlerSubmit = () => {
  };

  return (
    <nav class="navbar">
      {isAllow
        ? (
          <div class="navbar_filtros">
            <p class="uppercase text-black text-justify flex flex-col">
              <span>BIENVENIDO:</span> {nombre}
            </p>
            {page === "proy"
              ? (
                <div class="navbar_filtros_cont">
                  <form onSubmit={handlerSubmit} class="filtro_form">
                    <select name="antiguo" id="antiguo" class="filtro_select">
                      <option value="">segun antiguedad</option>
                      <option value="nuevo">mas nuevo</option>
                      <option value="antiguo">mas antiguo</option>
                      <option value="terminado">terminado</option>
                    </select>

                    <select name="fases" id="fases" class="filtro_select">
                      <option value="">segun fases</option>
                      <option value="f1">fase inicial</option>
                      <option value="f2">fase de diseño</option>
                      <option value="f3">fase de desarrollo</option>
                      <option value="f4">fase final</option>
                      <option value="f5">prefase inicial</option>
                    </select>
                  </form>

                  <div class="search_elm">
                    <SearchElement />
                  </div>
                  
                </div>
              )
              : ("")}
          </div>
        )
        : (
          <div class="navbar_filtros">
            <p class="text-black uppercase text-center">
              inicia sesion o registrate
            </p>
          </div>
        )}

      <div class="navbar_cuenta">
        <div class="navbar_buttom" onClick={handlerUrl}>
          <img src="/favicon/actions/user.svg" alt="" />
          <span>
            <p>
              {login}
            </p>
          </span>
        </div>
      </div>
    </nav>
  );
}
