import { useEffect, useState } from "preact/hooks/";
import { fetchData } from "../../lib/utils/metodos/fetchHelper.ts";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { CartUI } from "../../components/UI/cartUI.tsx";
import { ContInsp } from "../../components/Element/contInsp.tsx";
import { ModalInspeccion } from "../../components/Modal/modalInspeccion.tsx";

// Modal para inspección, similar a ModalDocumento

export default function CartInspeccion({ proyid, edit }: { proyid: string; edit: boolean }) {
  const [inspecciones, setInspecciones] = useState<InspeccionProps[]>([]);
  const [act, setAct] = useState(false);
  const [edt, setEdt] = useState(false);
  const [selectInsp, setSelectInsp] = useState<InspeccionProps | null>(null);
  const [insID, setInsID] = useState<string>("");

  useEffect(() => {
    const fetchProy = async () => {
      const result = await fetchData<{ result: InspeccionProps[] }>(
        `/api/proyApi/proyIRest?idproy=${proyid}`,
        {},
        setMessage as (type: string, msg: string) => void,
      );
      if (result?.result) setInspecciones(result.result);
      console.log();
    };
    fetchProy();
  }, [proyid]);

  const handlerNewInspeccion = () => {
    setAct((p) => !p);
    setSelectInsp(null);
  };

  const handleSelectInspeccion = (insp: InspeccionProps) => {
    setSelectInsp(insp);
    setInsID(insp.id ?? "");
    setAct(true);
    setEdt(false);
  };

  const onSubmitInspeccion = async (e: Event, metodo: "POST" | "PUT") => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    setMessage("alerta", "Cargando inspección, no salga de la página...");

    try {
      const res = await fetch(
        `/api/proyApi/proyIRest?idproy=${insID ? insID : proyid}`,
        {
          method: metodo,
          body: formData,
        },
      );
      const data = await res.json();
      if (res.status === 200) {
        setMessage(
          "completado",
          `${data.message} Inspección ${
            metodo === "POST" ? "creada" : "actualizada"
          }. La página se recargará`,
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
    <CartUI
      onclick={handlerNewInspeccion}
      titulo="Inspecciones"
      edit= {edit}
      styleCLS="proycart_main3"
    >
      <div class="w-full overflow-auto">
        <ContInsp inp={inspecciones} />
      </div>

      {act && (
        <form
          onSubmit={(e) => {
            onSubmitInspeccion(e, selectInsp ? "PUT" : "POST");
          }}
          class="proycart_modal"
        >
          <div onClick={handlerNewInspeccion}>
            <span>Cancelar</span>
          </div>
          {selectInsp && (
            <div onClick={() => setEdt((p) => !p)}>
              <span>Editar</span>
            </div>
          )}
          <h1>
            {selectInsp ? "Actualizar" : "Crear"} Inspección
          </h1>

          <ModalInspeccion
            nombre={selectInsp?.tipins || ""}
            tipo={selectInsp?.tipins || ""}
            descripcion={selectInsp?.desins || ""}
            fecha={selectInsp?.fecins || ""}
            estado={selectInsp?.estins || ""}
            noEdit={edt}
          />
          <button type="submit">
            {selectInsp ? "Actualizar" : "Registrar"}
          </button>
        </form>
      )}
    </CartUI>
  );
}

interface InspeccionProps {
  id?: string;
  proy?: string;
  tipins?: string;
  desins?: string;
  fecins?: string;
  estins?: string;
}
