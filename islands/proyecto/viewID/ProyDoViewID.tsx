import { useEffect, useState } from "preact/hooks/";
import { InputElement } from "../../../components/element/InputElement.tsx";
import { FileCargaElement } from "../../../components/element/FileElement.tsx";
import { SelectElement } from "../../../components/element/SelectElement.tsx";

interface dataProps {
  id: number;
  rol: string;
}

interface proyProps {
  id: number;
  idpro: number;
  nombredoc: string;
  tipodoc: string;
  publicado: Date;
  archivo: string;
  descripcion: string;
}

export function ProyDoViewID({ id, rol }: dataProps) {
  const [edit, setEdit] = useState(false);
  const [proy, setProy] = useState<proyProps[]>([]);

  const handlerActivar = () => {
    if (rol === "arq") setEdit(edit ? false : true);
    else setEdit(false);
  };

  useEffect(() => {
    const datos = async () => {
      try {
        const response = await fetch(`/api/proy/view/proyID?id=${id}`);

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        setProy(await response.json());
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    datos;
  }, [id]);

  return (
    <article>
      <button onClick={handlerActivar} type="button">
        activar edicion
      </button>
      {proy.map((p: proyProps) => (
        <form key={p.id} id={p.id.toString()}>
          <InputElement
            tipo="text"
            titulo="nombre"
            id="nombre"
            requerido
            defecto={p.nombredoc}
            editable={edit}
          />
          <SelectElement
            id="tipodoc"
            titulo="tipo de archivo"
            opciones={[
              { text: p.tipodoc, value: p.tipodoc },
              { text: "plano", value: "plano" },
              { text: "contrato", value: "contrato" },
            ]}
          />

          <InputElement
            tipo="datetime-local"
            titulo="publicado"
            id="publicado"
            requerido
            defecto={new Date(p.publicado).toISOString()}
            editable={false}
          />

          

          {edit ? <button type="submit">ACTUALIZAR</button> : ("")}
        </form>
      ))}
    </article>
  );
}
