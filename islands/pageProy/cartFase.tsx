import { useEffect, useState } from "preact/hooks/";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { ModalFase } from "../../components/Modal/modalFase.tsx";
import { LineFase } from "../../components/Element/lineFase.tsx";
import { fetchData } from "../../lib/utils/metodos/fetchHelper.ts";
import { CartUI } from "../../components/UI/cartUI.tsx";
import { setBlur } from "../../lib/utils/effectBlur.ts";
import { getTime } from "../../lib/utils/timeFormat.ts";

export default function CartFase({ proyid, edit }: cartFaseProp) {
  const [fase, setFase] = useState<FaseProps[]>([]);
  const [act, setAct] = useState(false);
  const [edt, setEdt] = useState(false);
  const [selectedFase, setSelectedFase] = useState<FaseProps | null>(null);
  const [faseID, setFaseID] = useState<string>("");

  useEffect(() => {
    const fetchProy = async () => {
      const result = await fetchData<{ result: FaseProps[] }>(
        `/api/proyApi/proyFRes?idproy=${proyid}`,
        {},
        setMessage as (type: string, msg: string) => void,
      );

      if (result?.result) {
        setFase(result.result);
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
    setEdt(true);
  };

  const onSubmitFase = async (e: Event, metodo: "POST" | "PUT") => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data = await fetchData<{ message: string }>(
      `/api/proyApi/proyFRes?idproy=${faseID || proyid}`,
      {
        method: metodo,
        body: formData,
      },
      setMessage as (type: string, msg: string) => void,
    );

    if (data) {
      setMessage(
        "completado",
        `${data.message} Fase ${metodo === "POST" ? "Creada" : "Actualizada"}`,
      );
      setTimeout(() => location.reload(), 2500);
    }

    setAct(false);
  };

  return (
    <CartUI onclick={handlerNewFase} edit={edit} titulo="Fase Actual">
      <LineFase
        fasep={fase}
        onclick={() => {
          if (fase.length > 0) {
            handleSelectFase(fase[fase.length - 1]);
          }
        }}
      />

      {act && (
        <form
          onSubmit={(e) => {
            onSubmitFase(e, selectedFase ? "PUT" : "POST");
          }}
          class="proycart_modal"
        >
          <div class="flex flex-row justify-center">
            <div
              onClick={() => {
                handlerNewFase();
                setBlur(false);
              }}
              class="bg-red-500 my-2 mx-2 px-2 py-1 rounded-md cursor-pointer"
            >
              <span>Cancelar</span>
            </div>
            {selectedFase && (
              <div
                class="bg-blue-400 my-2 mx-2 px-3 py-2 rounded-md cursor-pointer"
                onClick={() => setEdt((p) => !p)}
              >
                <span>Editar</span>
              </div>
            )}
          </div>
          <h1 class="text-black text-center text-xl font-bold">
            {selectedFase ? "ACTUALIZAR" : "CREAR"} FASE
          </h1>

          <ModalFase
            nombre={selectedFase?.nomfas || ""}
            tipo={selectedFase?.tipfas || ""}
            fecha={selectedFase?.fecfas || getTime()}
            noEdit={edt}
          />
          <div class="w-full flex justify-center align-middle items-center">
            <button
              type="submit"
              class="bg-[#658895] hover:bg-[#e4c36f] rounded-md py-2 px-4"
            >
              {selectedFase ? "Actualizar" : "Registrar"}
            </button>
          </div>
        </form>
      )}
    </CartUI>
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
  edit: boolean;
}
