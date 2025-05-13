import { SearchBar } from "../Element/searchBar.tsx";

interface NavProp {
  page: "proy" | "other";
  nombre: string;
  isAllow: boolean;
  arq: boolean;
  codigo: string;
}

export default function NavBar(
  { page, nombre, isAllow, arq, codigo }: NavProp,
) {
  const onclickRedirect = (codigo: string) => {
    globalThis.location.href = isAllow ? `/usuario/${codigo}` : "/sesion/login";
  };

  return (
    <nav class="navbar">
      <div class="navbar_nombre">
        <h2 class="md:opacity-100 opacity-0 flex flex-col">
          <span class="font-bold italic text-xl">BIENVENIDO</span>
          <span class="font-mono text-xl">
            {isAllow && (arq ? "arquitecto:" : "cliente:" + " ")}
            {" " + nombre}
          </span>
        </h2>
      </div>
      <div class="lg:w-2/3 md:w-full w-full justify-between flex lg:flex-row md:flex-row flex-col-reverse">
        <div class="lg:11/12 md:w-1/2 w-full flex items-center align-middle justify-center">
          {page === "proy" ? <SearchBar /> : ("")}
        </div>
        <div class="navbar_cont_btn flex items-center align-middle justify-center">
          <button type="button" class="navbar_btn" onClick={() => onclickRedirect(codigo)}>
            {isAllow ? "Cuenta" : "Iniciar"}
          </button>
        </div>
      </div>
    </nav>
  );
}
