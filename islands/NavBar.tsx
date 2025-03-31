import { useEffect, useState } from "preact/hooks/";

interface Data {
  isAllowed: boolean;
  ci?: number;
  style?: string;
}

//~~  ~~\\

export function NavBar({ isAllowed, ci }: Data) {
  const [login, setLogin] = useState("");

  useEffect(() => {
    setLogin(isAllowed ? "logout" : "login");
  }, [isAllowed]);

  const handleLoginClick = () => {
    globalThis.location.href = "/sesion/login";
  };

  const handleLogoutClick = () => {
    globalThis.location.href = "/sesion/logout";
  };

  return (
    <nav>
      <div className="NavBar-dx">
        <div className="div1-n">
          {isAllowed? <p>BIENVENIDO {ci}</p> : ("NO LOGUEADO 0  /\ 0")}
        </div>

        <div className="div2-n">
          <input
            type="search"
            name="buscador"
            id="buscador"
            className="searchXD"
          />

          <div className="div-count">
            <button
              id="data"
              type="button"
              onClick={isAllowed ? handleLogoutClick : handleLoginClick}
            >
              <img src="/favicon/user.svg" alt="xd" className="h-6 w-6" />
              <span>{login}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
