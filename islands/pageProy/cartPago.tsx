import { useEffect, useState } from "preact/hooks/";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { ModalPago } from "../../components/Modal/modalPago.tsx";
import { BarPagos } from "../../components/Element/barPagos.tsx";
import { fetchData } from "../../lib/utils/metodos/fetchHelper.ts";

export default function CartPago({ proyid, edit }: cartPagoProp) {
  const [pagos, setPagos] = useState<PagoProps[]>([]);
  const [precio, setPrecio] = useState<number>();
  const [act, setAct] = useState(false);
  const [edt, setEdt] = useState(false);
  const [selectedPago, setSelectedPago] = useState<PagoProps | null>(null);
  const [pagoID, setPagoID] = useState<string>("");

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await fetch(`/api/proyApi/proyPRes?idproy=${proyid}`);
        const result = await res.json();

        if (res.status === 200 && result.data && result.precio) {
          setPagos(result.data);
          setPrecio(result.precio);
        } else setMessage("alerta", `${result.message} de pagos`);
      } catch (error) {
        console.log("Error ", error);
        setMessage("error", `Pago, ${error}`);
      }
    };
    fetchPagos();
  }, [proyid]);

  const handlerNewPago = () => {
    setAct((p) => !p);
    setSelectedPago(null);
  };

  const handleSelectPago = (pagoItem: PagoProps) => {
    setSelectedPago(pagoItem);
    setPagoID(pagoItem.id ?? "");
    setAct(true);
    setEdt(false);
  };

  const onSubmitPago = async (e: Event, metodo: "POST" | "PUT") => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data = await fetchData<{ message: string }>(
      `/api/proyApi/proyPRes?idproy=${pagoID ? pagoID : proyid}`,
      {
        method: metodo,
        body: formData,
      },
      setMessage as (type: string, message: string) => void,
    );

    if (data) {
      setMessage(
        "completado",
        `${data.message} Pago ${metodo === "POST" ? "Creado" : "Actualizado"}`,
      );
      setTimeout(() => location.reload(), 2500);
    }

    setAct(false);
  };

  return (
    <div class="proycart_main">
      {edit &&
        <div
          onClick={handlerNewPago}
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
      }
      <div>
        <h1 class="proycart_title">Estado Economico</h1>

        <div class="w-full h-full flex justify-center align-middle items-center px-4">
          <BarPagos pagop={pagos} precioTotal={precio ?? 0} />
        </div>
      </div>
      {act && (
        <form
          onSubmit={(e) => {
            onSubmitPago(e, selectedPago ? "PUT" : "POST");
          }}
          class="proycart_modal"
        >
          <div class="flex flex-row justify-center">
            <div
              onClick={handlerNewPago}
              class="bg-red-500 my-2 mx-2 px-2 py-1 rounded-md cursor-pointer"
            >
              <span>Cancelar</span>
            </div>
            {selectedPago && (
              <div
                onClick={() => setEdt((p) => !p)}
                class="bg-blue-400 my-2 mx-2 px-3 py-2 rounded-md cursor-pointer"
              >
                <span>Editar</span>
              </div>
            )}
          </div>
          <h1 class="text-black text-center text-xl font-bold">
            {selectedPago ? "ACTUALIZAR" : "CREAR"} PAGO
          </h1>

          <ModalPago
            nombre={selectedPago?.nompag || ""}
            tipo={selectedPago?.tippag || ""}
            fecha={selectedPago?.fecpag || ""}
            descripcion={selectedPago?.despag || ""}
            monto={selectedPago?.monpag || 0}
            noEdit={edt}
          />
          <div class="w-full flex justify-center align-middle items-center">
            <button
              type="submit"
              class="bg-[#658895] hover:bg-[#e4c36f] rounded-md py-2 px-4"
            >
              {selectedPago ? "Actualizar" : "Registrar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

interface PagoProps {
  id?: string;
  proy?: string;
  nompag?: string;
  fecpag?: string;
  tippag?: string;
  despag?: string;
  monpag?: number;
}

interface cartPagoProp {
  proyid?: string;
  edit: boolean;
}
