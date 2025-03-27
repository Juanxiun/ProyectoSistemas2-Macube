import { useEffect, useState } from "preact/hooks/";

interface Data {
  isAllowed: boolean;
  ci?: number;
  style? : string;
}

export default function NavBar({ isAllowed, ci }: Data) {
  const [login, setLogin] = useState("login");

  useEffect(() => {
    setLogin(isAllowed ? "logout" : "login");
  }, [isAllowed]);

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleLogoutClick = () => {
    window.location.href = "/logout";
  };

  return (
    <nav className="NavBar">
      <div className="NavBar-dx">
        <div className="div1-n">
          {isAllowed && <p>BIENVENIDO {ci}</p>}
        </div>

        <div className="div2-n">
          <input type="search" name="buscador" id="buscador" className="searchXD" />

          <div className="div-count">
            <button id="data" type="button" onClick={isAllowed ? handleLogoutClick : handleLoginClick}>
              <img src="/favicon/user.svg" alt="xd" className="h-6 w-6" />
              <span>{login}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
