import { getTime } from "../../lib/utils/timeFormat.ts";
import { InputUI } from "../UI/InputUI.tsx";
import { SelectUI } from "../UI/SelectUI.tsx";

interface ModalInspeccionProps {
  nombre: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  noEdit: boolean;
}

export function ModalInspeccion({
  nombre,
  tipo,
  descripcion,
  fecha,
  estado,
  noEdit,
}: ModalInspeccionProps) {
  // Fecha mínima: hoy a las 09:00
  const hoy = new Date();
  hoy.setHours(9, 0, 0, 0);
  const minFecha = hoy.toISOString().slice(0, 16);

  const maxFechaObj = new Date(hoy);
  maxFechaObj.setMonth(maxFechaObj.getMonth() + 3);
  maxFechaObj.setHours(18, 0, 0, 0);
  const maxFecha = maxFechaObj.toISOString().slice(0, 16);

  return (
    <>
      <SelectUI
        id="tipins"
        titulo="Tipo de inspección"
        desactivar={noEdit}
        opciones={[
          {
            text: `Tipo actual: ${tipo ? tipo : "Sin asignar"}`,
            valor: `${tipo ? tipo : ""}`,
          },
          ...[
            { text: "Lote", valor: "lote" },
            { text: "Construcción", valor: "construccion" },
            { text: "Legalización", valor: "legalizacion" },
          ].filter((op) => op.valor !== tipo),
        ]}
        escala="full"
        classCLS=""
      />
      <InputUI
        id="desins"
        titulo="Descripción"
        tipo="text"
        valor={descripcion ?? ""}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
      <InputUI
        id="fecins"
        titulo="Fecha y hora"
        tipo="datetime-local"
        valor={fecha ?? getTime()}
        noEdit={noEdit}
        necesario
        classCLS=""
        min={minFecha}
        max={maxFecha}
        step="1800" 
      />
      <InputUI
        id="estins"
        titulo=""
        tipo="hidden"
        valor="pendiente"
        noEdit
        necesario
        classCLS=""
      />
    </>
  );
}