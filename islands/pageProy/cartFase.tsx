import { useEffect, useState } from "preact/hooks/";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { ModalFase } from "../../components/Modal/modalFase.tsx";
import { LineFase } from "../../components/Element/lineFase.tsx";

export default function CartFase({ proyid }: cartFaseProp) {
  const [fase, setFase] = useState<FaseProps[]>([]);
  const [act, setAct] = useState(false);
  const [edt, setEdt] = useState(false);
  const [selectedFase, setSelectedFase] = useState<FaseProps | null>(null);
  const [faseID, setFaseID] = useState<string>("");

  useEffect(() => {
    const fetchProy = async () => {
      try {
        const res = await fetch(`/api/proyApi/proyFRes?idproy=${proyid}`);
        const result = await res.json();

        if (res.status === 200 && result.result) {
          setFase(result.result);
        } else setMessage("alerta", `${result.message} de fases`);
      } catch (error) {
        console.log("Error ", error);
        setMessage("error", `Fase, ${error}`);
      }
    };
    fetchProy();
  }, [proyid]);

  const handlerNewFase = () => {
    setAct((p) => !p);
    setSelectedFase(null);
  };

  const handleSelectFase = (faseItem: FaseProps) => {
    setSelectedFase(faseItem);
    setFaseID(faseItem.id ?? "");
    setAct(true);
    setEdt(false);
  };

  const onSubmitFase = async (e: Event, metodo: "POST" | "PUT") => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log(metodo);
    try {
      const res = await fetch(
        `/api/proyApi/proyFRes?idproy=${faseID ? faseID : proyid}`,
        {
          method: metodo,
          body: formData,
        },
      );
      const data = await res.json();
      if (res.status === 200) {
        setMessage(
          "completado",
          `${data.message} Fase ${
            metodo === "POST" ? "creada" : "actualizada"
          }`,
        );
        setTimeout(() => {
          globalThis.location.reload();
        }, 2500);
      } else {
        setMessage("alerta", data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("error", `Error encontrado ${error}`);
    } finally {
      setAct(false);
    }
  };

  return (
    <div class="proycart_main">
      <div
        onClick={handlerNewFase}
        class="bg-white 
              w-12 h-12 
              rounded-full p-2 
              cursor-pointer 
              absolute right-2 top-2
              flex justify-center 
              align-middle items-center
              hover:bg-[#e4c36f]"
      >
        <img src="/assets/carts/lapiz.svg" height={30} width={30} alt="" />
      </div>
      <div class="h-full">
        <h1 class="proycart_title">Fase actual</h1>

        <div class="w-full h-full flex justify-center align-middle items-center">
          <LineFase
            fasep={fase}
            onclick={() => {
              if (fase.length > 0) {
                handleSelectFase(fase[fase.length - 1]);
              }
            }}
          />
        </div>
      </div>
      {act && (
        <form
          onSubmit={(e) => {
            onSubmitFase(e, selectedFase ? "PUT" : "POST");
          }}
          class="proycart_modal"
        >
          <div onClick={handlerNewFase}>
            <span>Cancelar</span>
          </div>
          {selectedFase && (
            <div onClick={() => setEdt((p) => !p)}>
              <span>Editar</span>
            </div>
          )}
          <h1>
            {selectedFase ? "ACTUALIZAR" : "CREAR"} FASE
          </h1>

          <ModalFase
            nombre={selectedFase?.nomfas || ""}
            tipo={selectedFase?.tipfas || ""}
            fecha={selectedFase?.fecfas || ""}
            noEdit={edt}
          />
          <button type="submit">
            {selectedFase ? "Actualizar" : "Registrar"}
          </button>
        </form>
      )}
    </div>
  );
}

interface FaseProps {
  id?: string;
  proy?: string;
  nomfas?: string;
  fecfas?: string;
  tipfas?: string;
}

interface cartFaseProp {
  proyid?: string;
}
