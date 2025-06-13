import { ComponentChildren } from "preact/src/index.d.ts";
import SiderBar from "../../components/Layout/Siderbar.tsx";
import NavBar from "../../components/Layout/NavBar.tsx";
import MessagesAlert from "../../components/Layout/messageAlert.tsx";
import { useEffect, useState } from "preact/hooks/";
import { getBlur } from "../../lib/utils/effectBlur.ts";
import { getLoadScreen } from "../../lib/utils/displayLoad.ts";

interface Props {
  children: ComponentChildren;
  page: "proy" | "other";
  isAllow: boolean;
  nombre: string;
  rol: string;
  codigo: string;
}

export default function EstructuraPageMain(
  { children, page, nombre, rol, isAllow, codigo }: Props,
) {
  const [_act, setAct] = useState<boolean>(false);
  const [loading, setLoading] = useState<
    { estado: boolean; mensaje?: string } | null
  >(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const blur = await getBlur();
      setAct(blur);
      const load = getLoadScreen();
      setLoading(load);
    }, 250);
    return () => clearInterval(interval);
  }, []);

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
      <SiderBar view={rol === "arq" ? true : false} isAllow={isAllow} userID={codigo} />
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
              <div className="relative w-full h-full">
          {loading?.estado && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#393a44]/50 backdrop-blur-md rounded-b-xl">
              <img src="/logo.svg" alt="" class="w-32 h-32 animate-pulse" />
              <svg
                className="animate-spin h-12 w-12 text-[#658895] mb-4"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="0000"
                  strokeWidth="4"
                  fill="#c7c7c7"
                />
                <path
                  className="opacity-95"
                  fill="#e4c36f"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-white text-xl font-bold text-center px-4">
                {loading.mensaje ?? "Cargando..."}
              </span>
            </div>
          )}
          <div
            className={`relative z-10 w-full h-full transition-all duration-200 ${
              loading?.estado
                ? "pointer-events-none select-none blur-sm overflow-hidden max-h-screen"
                : ""
            }`}
            style={loading?.estado ? { maxHeight: "100vh" } : {}}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
