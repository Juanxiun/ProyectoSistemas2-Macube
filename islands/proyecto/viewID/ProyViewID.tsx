import { useEffect, useState } from "preact/hooks/";
import { InputElement } from "../../../components/element/InputElement.tsx";
import { SelectElement } from "../../../components/element/SelectElement.tsx";
import { timeSet } from "../../../lib/utils/setTime.ts";
import { MessageElement } from "../../../components/element/MessageElement.tsx";

interface dataProps {
  id: number;
  rol: string;
}

interface proyProps {
  nombre: string;
  tipo: string;
  precio: number;
  inicio: Date;
  imagen: string;
  direccion: string;
}

export function ProyViewID({ id, rol }: dataProps) {
  const [edit, setEdit] = useState(true);
  const [proy, setProy] = useState<proyProps>();
  const [imagen, setImagen] = useState<string | null>(null);
  const [msj, setMsj] = useState<string>("");
  const [reload, setReload] = useState(false);

  const handlerActivar = () => {
    if (rol === "cli" || rol === "arq") {
      setEdit((prev) => !prev);
    } else {
      setEdit(false);
    }
  };

  useEffect(() => {
    const datos = async () => {
      try {
        const response = await fetch(`/api/proy/view/proyID?id=${id}`);

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const proy = await response.json();
        setProy(proy[0]);

        if (proy[0].imagen) {
          setImagen(proy[0].imagen);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    datos();
  }, [reload]);

  const handleImagen = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString().split(",")[1] || null;
        setImagen(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlerSubmint = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/proy/edit/editProy/", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errrData = await res.json();
        throw new Error(errrData.error);
      }

      setMsj("EXITO. actualizacion completada");
      setTimeout(() => setMsj(""), 2500);
      setEdit(true);
      setReload((prev) => !prev);
    } catch (error) {
      setMsj(
        `${error instanceof Error ? error.message : "Error des servidor"}`,
      );
    }
  };

  return (
    <article class="viewproy_cont">
      <div onClick={handlerActivar} class="btn-edit">
        <img src="/favicon/actions/edit.svg" />
      </div>
      <div class="message z-30">
        {msj &&
          (
            <MessageElement
              message={msj}
              typeM={msj.includes("EXITO.") ? true : false}
            />
          )}
      </div>
      <form class="viewproy_form" onSubmit={handlerSubmint}>
        <div class="viewproy_form_image">
          {edit === false
            ? (
              <div class="viewpoy_form_img_cont">
                <InputElement
                  tipo="file"
                  titulo=""
                  id="imagen"
                  defecto={proy?.imagen}
                  onchage={handleImagen}
                  accept=".jpg, .jpeg, image/jpeg"
                  classSTL="viewproy_form_edit_img"
                  requerido
                />
              </div>
            )
            : ("")}

          <div class="viewproy_img">
            {imagen &&
              <img src={`data:image/jpeg;base64,${imagen}`} alt="" />}
          </div>
        </div>

        <div class="viewproy_form_data">
          <h1 class="text-2xl text-white underline">DATOS DE PROYECTO</h1>
          <div class="w-1/2 flex justify-center align-middle items-center">
            <InputElement
              tipo="number"
              titulo="Nro. proy"
              id="idproy"
              requerido
              defecto={id.toString()}
              editable
            />
          </div>
          <div class="viewproy_form_data_name">
            <InputElement
              tipo="text"
              titulo="nombre"
              id="nombre"
              requerido
              defecto={proy?.nombre}
              editable={edit}
            />

            {edit === false
              ? (
                <SelectElement
                  id="tipo"
                  titulo="tipo"
                  classSTL="viewproy_form_select"
                  opciones={[
                    { text: "construccion", value: "construccion" },
                    { text: "inspeccion", value: "inspeccion" },
                  ]}
                />
              )
              : (
                <InputElement
                  tipo="text"
                  titulo="tipo"
                  id="tipo"
                  requerido
                  defecto={proy?.tipo}
                  editable={false}
                />
              )}
          </div>
          <InputElement
            tipo="number"
            titulo="precio"
            id="precio"
            requerido
            defecto={proy?.precio.toString()}
            editable={edit}
          />
          <InputElement
            tipo="text"
            titulo="inicio"
            id="direccion"
            requerido
            defecto={proy?.direccion}
            editable={edit}
          />
          <div class="viewproy_form_date">
            <InputElement
              tipo="datetime-local"
              titulo="inicio"
              id=""
              requerido
              defecto={proy?.inicio ? timeSet(new Date(proy.inicio)) : ""}
              editable
            />
          </div>

          {edit === false
            ? (
              <button
                class="
                bg-white px-3 py-2 rounded-2xl absolute bottom-2 left-44"
                type="submit"
              >
                ACTUALIZAR
              </button>
            )
            : ("")}
        </div>
      </form>
    </article>
  );
}
