import { formatTime } from "../../lib/utils/timeFormat.ts";
import { InputUI } from "../UI/InputUI.tsx";
import { SelectUI } from "../UI/SelectUI.tsx";

export function ModalFase(
    {noEdit, nombre, fecha, tipo}: FasemProp
) {
  return (
    <>
      <SelectUI
        id="tipfas"
        titulo="fase actual"
        desactivar={noEdit}
        opciones={[
            {
                text: `fase ${tipo? tipo : "sin asignar"}`,
                valor: `${tipo? tipo : ""}`,
            },
            ...[
                {text: "fase inicial", valor: "inicial"},
                {text: "fase desarrollo", valor: "desarrollo"},
                {text: "fase legalizacion", valor: "legal"},
                {text: "fase conclusion", valor: "fin"},
                {text: "fase conflictos", valor: "conflicto"},
            ].filter((op) => op.valor !== tipo),
        ]}
        escala="full"
        classCLS=""
      />
      <InputUI
        id="nomfas"
        titulo="nombre de la fase"
        tipo="text"
        valor={nombre?? " "}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
      <InputUI
        id="fecfas"
        titulo="fecha de creacion"
        tipo="datetime-local"
        valor={fecha? formatTime(fecha) : " "}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
    </>
  );
}

interface FasemProp{
    nombre?: string;
    fecha?: string;
    tipo?: string;
    noEdit: boolean;
}