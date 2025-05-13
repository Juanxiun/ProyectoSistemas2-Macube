import { ComponentChildren } from "preact/src/index.d.ts";
import SiderBar from "../../components/Layout/Siderbar.tsx";
import NavBar from "../../components/Layout/NavBar.tsx";
import MessagesAlert from "../../components/Layout/messageAlert.tsx";

interface Props {
  children: ComponentChildren;
  page: "proy" | "other";
  isAllow: boolean;
  nombre: string;
  rol: string;
  codigo: string;
}

export default function EstructuraPageMain(
  { children, page, nombre, rol, isAllow, codigo}: Props,
) {
  return (
    <main
      className={`
        h-full w-full 
        lg:px-4 md:px-2 px-2 
        lg:py-5 md:py-4 py-0
        flex 
        lg:flex-row md:flex:col flex-col 
        justify-between`}
    >
      <SiderBar view={rol === "arq" ? true : false} isAllow={isAllow} />
      <div
        className={`
            h-full bg-[white]/80 relative lg:w-full md:w-full w-full rounded-xl overflow-y-auto scrollbar-hide`}
      >
        <NavBar
          page={page}
          nombre={nombre}
          isAllow={isAllow}
          codigo={codigo}
          arq={rol === "arq" ? true : false}
        />
        <MessagesAlert />
        <div className={`z-10 px-3 py-4 w-full h-full`}>
          {children}
        </div>
      </div>
    </main>
  );
}
