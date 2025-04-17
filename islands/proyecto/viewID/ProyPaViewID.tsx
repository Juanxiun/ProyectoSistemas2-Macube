import { useEffect, useState } from "preact/hooks";
import PagosHechos from "../../../components/element/PagosElement.tsx";
import { MessageElement } from "../../../components/element/MessageElement.tsx";
import { InputElement } from "../../../components/element/InputElement.tsx";
import { SelectElement } from "../../../components/element/SelectElement.tsx";
import { timeSet } from "../../../lib/utils/setTime.ts";

interface dataProps {
  id: number;
  rol: string;
}

interface proyProps {
  id: number;
  idpro: number;
  tipopago: string;
  monto: number;
  fechapag: Date;
  detalles: string;
}

export function ProyPaViewID({ id, rol }: dataProps) {
  const [reload, setReload] = useState(false);
  const [newPago, setNewPago] = useState(false);
  const [editPago, setEditPago] = useState(false);
  const [proy, setProy] = useState<proyProps[]>([]);
  const [msj, setMsj] = useState("");
  const [precio, setPrecio] = useState(0);
  const [tiempo, setTiempo] = useState("");
  interface Pago {
    monto: number;
    fechapag: string;
  }

  const [pagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resPrecio, resPagos] = await Promise.all([
          fetch(`/api/proy/view/proyID?id=${id}`),
          fetch(`/api/proy/view/proyPaID?id=${id}`),
        ]);

        if (!resPrecio.ok || !resPagos.ok) {
          throw new Error("No se pudieron obtener los datos.");
        }

        const [precioData, pagosData] = await Promise.all([
          resPrecio.json(),
          resPagos.json(),
        ]);

        setPrecio(parseInt(precioData[0]?.precio ?? "0"));
        setProy(pagosData);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };
    cargarDatos();
    const ahora = new Date();
    setTiempo(
      `${ahora.getFullYear()}-${
        String(ahora.getMonth() + 1).padStart(2, "0")
      }-${String(ahora.getDate()).padStart(2, "0")}T${
        String(ahora.getHours()).padStart(2, "0")
      }:${String(ahora.getMinutes()).padStart(2, "0")}`,
    );
  }, [reload]);

  useEffect(() => {
    if (proy[0] && proy[0].fechapag) {
      console.log(proy[0].fechapag);

      const fechaPago = new Date(proy[0].fechapag);

      const nuevosPagos = proy.map((p) => ({
        monto: parseInt(p?.monto?.toString() ?? "0"),
        fechapag:
          p.fechapag instanceof Date && !isNaN(new Date(p.fechapag).getTime())
            ? new Date(p.fechapag).toISOString()
            : "",
      }));

      setPagos(nuevosPagos);
    }
  }, [proy]);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/proy/new/newProyPa", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Error al registrar pago.");
      }

      setMsj("EXITO. ACTUALIZACION DE FASE COMPLETADA");
      setTimeout(() => setMsj(""), 1500);
      setNewPago(false);
      setEditPago(false);
      setReload((prev) => !prev);
    } catch (err) {
      setMsj(`Error. ${err instanceof Error ? err.message : "desconocido"}`);
      setTimeout(() => setMsj(""), 1500);
    }
  };

  const toggleNew = () => setNewPago(!newPago);
  const toggleEdit = () => setEditPago(!editPago);

  const opcionesPago = [
    ...(editPago && proy[0]
      ? [{
        text: `---- ${proy[0].tipopago.toLowerCase()} ----`,
        value: proy[0].tipopago.toLowerCase(),
      }]
      : []),
    { text: "pago con tarjeta", value: "pagoT" },
    { text: "pago efectivo", value: "pagoE" },
    { text: "pago por QR", value: "pagoQ" },
  ];

  const renderForm = () => (
    <form onSubmit={handleSubmit} class="viewproyfaMod_uc">
      <h2 class="text-lg font-bold mb-4 uppercase">crear pago</h2>

      <InputElement
        id="precio"
        tipo="number"
        titulo="Monto total"
        defecto={precio.toString() ?? ""}
        classSTL="createFa_des"
        requerido
        editable
      />

      <InputElement
        id="monto"
        tipo="number"
        titulo="Monto que pagó"
        classSTL="createFa_des"
        requerido
      />

      <SelectElement
        id="tipopago"
        titulo="Seleccione la fase"
        opciones={opcionesPago}
        classSTL="createFa_fas"
      />

      <InputElement
        id="detalles"
        tipo="text"
        titulo="Detalles"
        classSTL="createFa_des"
        requerido
      />

      <InputElement
        id="fechapag"
        tipo="datetime-local"
        titulo="Fecha del pago"
        defecto={tiempo}
        classSTL="createFa_des"
        requerido
        editable
      />

      <button
        type="submit"
        class="my-4 rounded-lg py-3 px-4 bg-[#658895] text-white"
      >
        REGISTRAR FASE
      </button>
    </form>
  );

  return (
    <article class="proypa_cont">
      {rol === "arq" && (
        <button
          type="button"
          onClick={proy.length === 0 ? toggleNew : toggleEdit}
          class="btn_new_vP"
        >
          <img
            src={proy.length === 0
              ? "/favicon/actions/new.svg"
              : "/favicon/actions/edit.svg"}
          />
        </button>
      )}

      {msj && (
        <div class="message z-50">
          <MessageElement message={msj} typeM={msj.includes("EXITO.")} />
        </div>
      )}

      <div class="viewproyPa_cont_form">
        {(newPago || editPago) && renderForm()}
      </div>

      <div class="proypa_cont_int">
        <PagosHechos
          total={precio}
          pagos={pagos.map((pago) => ({
            pago: pago.monto,
            fecha: pago.fechapag,
          }))}
        />
      </div>
    </article>
  );
}
