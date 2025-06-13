import { InputUI } from "../UI/InputUI.tsx";
import { SelectUI } from "../UI/SelectUI.tsx";

interface ModalPagoProps {
  nombre: string;
  tipo: string;
  fecha: string;
  descripcion: string;
  monto: number;
  noEdit: boolean;
}

export const ModalPago = (
  { nombre, tipo, fecha, descripcion, monto, noEdit }: ModalPagoProps,
) => {
  return (
    <>
      <InputUI
        id="nompag"
        titulo="Nombre del pago"
        tipo="text"
        valor={nombre ?? ""}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
      <SelectUI
        id="tippag"
        titulo="Tipo de pago"
        desactivar={noEdit}
        opciones={[
          {
            text: `Tipo actual: ${tipo ? tipo : "Sin asignar"}`,
            valor: `${tipo ? tipo : ""}`,
          },
          ...[
            { text: "Pago inicial", valor: "inicial" },
            { text: "Pago parcial", valor: "parcial" },
            { text: "Pago final", valor: "final" },
          ].filter((op) => op.valor !== tipo),
        ]}
        escala="full"
        classCLS=""
      />
      <InputUI
        id="fecpag"
        titulo="Fecha del pago"
        tipo="datetime-local"
        valor={fecha ?? ""}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
      <InputUI
        id="despag"
        titulo="Descripción del pago"
        tipo="text"
        valor={descripcion ?? ""}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
      <InputUI
        id="monpag"
        titulo="Monto del pago"
        tipo="number"
        valor={monto.toString()}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
    </>
  );
};
