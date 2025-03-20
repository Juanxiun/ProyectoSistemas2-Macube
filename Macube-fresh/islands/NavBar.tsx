interface Data {
  isAllowed: boolean;
}

export default function NavBar({ isAllowed }: Data) {

  return (
    <nav class="NavBar">
      <div class="NavMain">
        {isAllowed
          ? (
            <div class="NavCont">
              <p>Bienvenido</p>
            </div>
          )
          : (
            <div>
              <p>INICIA SESION PARA VER EL CONTENIDO</p>
            </div>
          )}

        <div class="NavCont2">
          <a href="">CREAR UNA CITA</a>
          <a href="/login">INCIAR SESION</a>
        </div>
      </div>
    </nav>
  );
}
