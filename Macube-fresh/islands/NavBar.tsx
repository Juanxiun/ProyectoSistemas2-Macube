interface Data {
  isAllowed: boolean;
  ci?: number;
  style? : string;
}

export default function NavBar({ isAllowed, ci}: Data) {
  return (
    <nav class="NavBar">
      <div class="NavBar-dx">
        <div class="div1-n">
          {isAllowed ? <p>BIENVENIDO</p> : ("")}
        </div>

        <div class="div2-n">
          <input type="search" name="buscador" id="buscador" class="searchXD" />

          <div className="div-count">
            
            <button type="button" href="/">
              <img src="/favicon/user.svg" alt="xd" className="h-6 w-6" />
              <span>cuenta</span>
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
