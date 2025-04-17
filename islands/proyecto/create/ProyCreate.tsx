import { useEffect, useState } from "preact/hooks/";
import { InputElement } from "../../../components/element/InputElement.tsx";
import { SelectElement } from "../../../components/element/SelectElement.tsx";
import { MessageElement } from "../../../components/element/MessageElement.tsx";

interface clientProps {
  cod: number;
  nombres: string;
  apellidos: string;
}

export function ProyCreate() {
  const [tiempo, setTiempo] = useState("");
  const [clientes, setClientes] = useState<clientProps[]>([]);
  const [imagen, setImagen] = useState<string | null>(null);
  const [msj, setMsj] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const formattedDateTime: string = `${now.getFullYear()}-${
      (now.getMonth() + 1)
        .toString()
        .padStart(2, "0")
    }-${now.getDate().toString().padStart(2, "0")} ${
      now
        .getHours()
        .toString()
        .padStart(2, "0")
    }:${now.getMinutes().toString().padStart(2, "0")}`;

    setTiempo(formattedDateTime);
  });

  const handlerClients = async () => {
    try {
      const response = await fetch("/api/client/clientView/");

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      setClientes(await response.json());
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

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

  const handlerSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/proy/new/newProy", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errrData = await res.json();
        throw new Error(errrData.error);
      }

      const data = await res.json();
      const idproy = data.codeproy;

      console.log(idproy);

      setMsj("EXITO. " + data.message);
      globalThis.location.href = `/proyectos/${idproy}`;
    } catch (error) {
      setMsj(
        `${error instanceof Error ? error.message : "Error des servidor"}`,
      );
    }
  };

  return (
    <form class="form_create" onSubmit={handlerSubmit}>
      <div class="message">
        {msj &&
          (
            <MessageElement
              message={msj}
              typeM={msj.includes("EXITO.") ? true : false}
            />
          )}
      </div>
      <h1>REGISTRAR PROYECTOS</h1>
      <div class="form_select_cli">
        <label htmlFor="usuario">SELECCION DE CLIENTES</label>
        <select
          name="cicli"
          onClick={handlerClients}
          id="cicli"
          required
        >
          <option value="">Seleccione...</option>
          {clientes.map((cliente) => (
            <option value={cliente.cod}>
              {cliente.nombres} {cliente.apellidos}
            </option>
          ))}
        </select>
      </div>
      <div class="form_create_name">
        <InputElement
          tipo="text"
          titulo="nombre"
          id="nombre"
          requerido
        />

        <SelectElement
          id="tipo"
          titulo="tipo proyecto"
          opciones={[
            { text: "construccion", value: "construccion" },
            { text: "supervision", value: "supervision" },
          ]}
          classSTL="form_create_select"
        />
      </div>
      <InputElement
        tipo="number"
        titulo="precio"
        id="precio"
        requerido
      />

      <InputElement
        tipo="datetime-local"
        titulo="fecha de creacion"
        id="inicio"
        defecto={tiempo}
        requerido
        editable
      />

      <InputElement
        tipo="text"
        titulo="direccion"
        id="direccion"
        requerido
      />

      <InputElement
        tipo="file"
        titulo="imagen"
        id="imagen"
        defecto={imagen ? imagen : ""}
        onchage={handleImagen}
        accept=".jpg, .jpeg, image/jpeg"
        classSTL="form_create_ipt"
        requerido
      />

      <div class="form_create_img">
        {imagen &&
          <img src={`data:image/jpeg;base64,${imagen}`} alt="" />}
      </div>

      <button type="submit">
        REGISTRAR
      </button>
    </form>
  );
}
