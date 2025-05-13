import { InputUI } from "../UI/InputUI.tsx";
import { SelectUI } from "../UI/SelectUI.tsx";

interface ModalDocumentoProps {
  nombre: string;
  tipo: string;
  archivo: File | null;
  publicado: string;
  noEdit: boolean;
}

export const ModalDocumento = (
  { nombre, tipo, archivo, publicado, noEdit }: ModalDocumentoProps,
) => {
  return (
    <>
      <InputUI
        id="nomdoc"
        titulo="Nombre del documento"
        tipo="text"
        valor={nombre ?? ""}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
      <SelectUI
        id="tipdoc"
        titulo="Tipo de documento"
        desactivar={noEdit}
        opciones={[
          {
            text: `Tipo actual: ${tipo ? tipo : "Sin asignar"}`,
            valor: `${tipo ? tipo : ""}`,
          },
          ...[
            { text: "Planos", valor: "planos" },
            { text: "Contratos", valor: "contratos" },
            { text: "Permisos", valor: "permisos" },
          ].filter((op) => op.valor !== tipo),
        ]}
        escala="full"
        classCLS=""
      />
      <InputUI
        id="arcdoc"
        titulo="Archivo del documento"
        tipo="file"
        valor={archivo ? archivo.name : ""}
        noEdit={noEdit}
        necesario
        classCLS=""
        accept=".pdf,.awg"
      />
      <InputUI
        id="pubdoc"
        titulo="Fecha de publicación"
        tipo="datetime-local"
        valor={publicado ?? ""}
        noEdit={noEdit}
        necesario
        classCLS=""
      />
    </>
  );
};