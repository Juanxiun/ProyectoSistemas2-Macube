interface Data {
  isAllowed: boolean;
  ci?: number;
}

export default function NavBar({ isAllowed, ci }: Data) {
  return (
    <nav class="NavBar">
      <div class="NavBar-I">
        <div class="div1-n">
          {isAllowed ? <p>BIENVENIDO USUARIO NUMERO DESCONOCIDO XD</p> : ("")}
        </div>

        <div class="div2-n">
          <input type="search" name="buscador" id="buscador" class="searchXD" />

          <div class="div-count">
            <a href="/">MI CUENTA</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
