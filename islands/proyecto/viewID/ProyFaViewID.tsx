import { useEffect, useState } from "preact/hooks/";
import { InputElement } from "../../../components/element/InputElement.tsx";
import { SelectElement } from "../../../components/element/SelectElement.tsx";
import { FaseElement } from "../../../components/element/FaseElement.tsx";
import { MessageElement } from "../../../components/element/MessageElement.tsx";
// import { timeSet } from "../../../lib/utils/setTime.ts";

interface dataProps {
  id: number;
  rol: string;
}

interface proyProps {
  id: number;
  idpro: number;
  fase: string;
  descripcion: string;
  fechafase: Date;
}

export function ProyFaViewID({ id, rol }: dataProps) {
  const [reload, setReload] = useState(false);
  const [newp, setNewp] = useState(false);
  const [edit, setEdit] = useState(false);
  const [proy, setProy] = useState<proyProps[]>([]);
  const [msj, setMsj] = useState("");
  const [tiempo, setTiempo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/proy/view/proyFaID?id=${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setProy(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const now = new Date();
    setTiempo(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${
        String(now.getDate()).padStart(2, "0")
      } ${String(now.getHours()).padStart(2, "0")}:${
        String(now.getMinutes()).padStart(2, "0")
      }`,
    );

    fetchData();
  }, [reload]);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/proy/new/newProyFa", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      setMsj("EXITO. ACTUALIZACION DE FASE COMPLETADA");
      setTimeout(() => setMsj(""), 1000);
      setNewp(false);
      setEdit(false);
      setReload((prev) => !prev);
    } catch (error) {
      setMsj(
        `Error. ${error instanceof Error ? error.message : "desconocido"}`,
      );
      console.log(error);
    }
  };

  const toggleNew = () => {
    console.log("hizo click");
    setNewp((prev) => !prev);
  };

  const toggleEdit = () => {
    console.log("edicion activada");
    setEdit((prev) => !prev);
  };

  const renderForm = (isEdit = false) => (
    <form onSubmit={handleSubmit} class="viewproyfaMod_uc">
      <h2 class="text-lg font-bold mb-4">
        {isEdit ? `EDITOR DE LA FASE ${proy[0].fase}` : "CREAR UNA FASE"}
      </h2>

      <InputElement
        id="idproy"
        tipo="text"
        titulo="proyecto"
        defecto={id.toString()}
        classSTL="createFa_des"
        requerido
        editable
      />

      <SelectElement
        id="fase"
        titulo="Seleccione la fase"
        opciones={[
          ...(isEdit
            ? [{
              text: "---- " + tipoFase(proy[0].fase) + " ----",
              value: proy[0].fase.toLowerCase(),
            }]
            : []),
          { text: "fase inicial", value: "fase1" },
          { text: "fase de desarrollo", value: "fase2" },
          { text: "fase de inspeccion", value: "fase3" },
          { text: "finalizar", value: "fase4" },
          { text: "fase conflicto", value: "fase0" },
        ]}
        classSTL="createFa_fas"
      />

      <InputElement
        id="descripcion"
        tipo="text"
        titulo="Descripcion"
        classSTL="createFa_des"
        requerido
      />

      <InputElement
        id="fechafase"
        tipo="datetime-local"
        titulo="Fecha de la fase"
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
    <article class="viewproyfa_cont">
      {rol === "arq" && (
        <button
          type="button"
          onClick={proy.length === 0 ? toggleNew : toggleEdit}
          class="btn_new_vf"
        >
          <img
            src={proy.length === 0
              ? "/favicon/actions/new.svg"
              : "/favicon/actions/edit.svg"}
          />
        </button>
      )}
      <div class="message z-50">
        {msj &&
          (
            <MessageElement
              message={msj}
              typeM={msj.includes("EXITO.") ? true : false}
            />
          )}
      </div>

      <h1>FASE DE PROYECTO</h1>
      {proy.length === 0 && <p>asigne una fase</p>}

      <div class="viewproyfa_cont_form">
        {newp && renderForm(false)}
        {edit && renderForm(true)}
      </div>

      {proy.length > 0 && <FaseElement fase={proy[0]?.fase ?? ""} />}
    </article>
  );
}

const tipoFase = (fase: string) => {
  switch (fase.toLowerCase()) {
    case "fase0":
      return "fase con conflico";
    case "fase1":
      return "fase inicial";
    case "fase2":
      return "fase de desarrollo";
    case "fase3":
      return "fase de inspecciones";
    case "fase4":
      return "proyecto finalizado";
    default:
      return "";
  }
};
