import { useState } from "preact/hooks";
import { MOD_PROYECTOS } from "../lib/database/models/proyectos/proyectoModel.ts";
import { Alerts } from "../components/Alerts.tsx";
import { uint8ArrayToBase64 } from "../lib/utils/converFile.ts";

// Función para convertir imagen a base64
const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string); 
      } else {
        reject("Error al leer la imagen.");
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function ProyNew() {
  const getLocalDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 16);
  };

  const [cliente, setCliente] = useState(0);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [inicio, setInicio] = useState(getLocalDateTime);
  const [imagen, setImagen] = useState<File | null>(null); // Guardar el archivo directamente

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleImageChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setImagen(file); // Guardar el archivo en el estado
    }
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (imagen) {
      try {

        const imageArray = new Uint8Array(await imagen.arrayBuffer())
        const base64String = uint8ArrayToBase64(imageArray)

        const _data: MOD_PROYECTOS = {
          id: 0,
          cicli: 76789876,
          codearq: "JA77JU14",
          nombre,
          tipo,
          inicio: new Date(),
          imagen: base64String,
          habilitado: 1,
        };

        const res = await fetch("/api/ProyApi/proyectos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_data),
        });

        const result = await res.json();

        if (res.status === 201) {
          setMessage(result.message);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error al registrar el proyecto.");
      }
    } else {
      setError("Por favor, seleccione una imagen.");
    }
  };

  return (
    <form onSubmit={onSubmit} class="form-proy">
      {message && <Alerts type="success" title="ÉXITO" context={message} />}
      {error && <Alerts type="danger" title="ERROR" context={error} />}

      <h1 class="form-proy-ti">REGISTRO PROYECTOS</h1>

      <label class="form-proy-la" for="cliente">CLIENTE</label>
      <select
        name="cliente"
        id="cliente"
        value={cliente}
        class="form-proy-inp"
        onChange={(e) =>
          setCliente(Number((e.target as HTMLSelectElement).value))}
      >
        <option value="">Seleccione un cliente</option>
      </select>

      <label class="form-proy-la" for="nombre">NOMBRE DE PROYECTO</label>
      <input
        type="text"
        name="nombre"
        id="nombre"
        class="form-proy-inp"
        value={nombre}
        onInput={(e) => setNombre((e.target as HTMLInputElement).value)}
      />

      <label class="form-proy-la" for="tipo">TIPO DE PROYECTO</label>
      <select
        name="tipo"
        id="tipo"
        value={tipo}
        class="form-proy-inp"
        onChange={(e) => setTipo((e.target as HTMLSelectElement).value)}
      >
        <option value="">NO DEFINIDO</option>
        <option value="proyecto">PROYECTO</option>
        <option value="planimetria">PLANIMETRIA</option>
        <option value="inspeccion">INSPECCION</option>
      </select>

      <label class="form-proy-la" for="inicio">FECHA DE INICIO</label>
      <input
        type="datetime-local"
        name="inicio"
        id="inicio"
        value={inicio}
        class="form-proy-inp"
        onInput={(e) => setInicio((e.target as HTMLInputElement).value)}
      />

      <label class="form-proy-la" for="imagen">IMAGEN</label>
      <input
        type="file"
        name="imagen"
        id="imagen"
        class="form-proy-inp"
        onChange={handleImageChange}
        accept="image/*"
      />

      {imagen && (
        <div class="mt-4 flex justify-center">
          <img
            src={URL.createObjectURL(imagen)} // Usar objectURL para vista previa antes de enviar
            alt="Vista previa de la imagen"
            class="w-32 h-32 object-cover rounded-md border"
          />
        </div>
      )}

      <div class="flex justify-center align-middle items-center">
        <button
          class="my-4 bg-white text-black w-1/2 py-3 rounded-2xl hover:bg-[#658895]"
          type="submit"
        >
          ENVIAR FORMULARIO
        </button>
      </div>
    </form>
  );
}
