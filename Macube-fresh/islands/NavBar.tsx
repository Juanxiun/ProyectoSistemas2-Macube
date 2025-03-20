import Search from "../components/Search.tsx";

interface Data {
  isAllowed: boolean;
  ci: number;
}

export default function NavBar({ isAllowed, ci }: Data) {
  return (
    <nav class="NavBar">
      <div class="NavMain">
        {isAllowed
          ? (
            <div class="NavCont">
              <p>Bienvenido:  {ci}</p>
              <Search />
            </div>
          )
          : (
            <div>
              <p>INICIA SESION PARA VER EL CONTENIDO</p>
            </div>
          )}

        <div class="NavCont2">
          <a href="/cite">CREAR UNA CITA</a>

          {isAllowed
            ? <a href="/logout">CERRAR SESION</a>
            : <a href="/login">INICIAR SESION</a>}
        </div>
      </div>
    </nav>
  );
}
