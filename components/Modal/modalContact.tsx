// deno-lint-ignore-file no-explicit-any
import { SelectUI } from "../UI/SelectUI.tsx";

interface contactProps {
  ci: string;
  nombre: string;
  correo: string;
  telefono: string;
  onClose: any;
  handlerSubmit: any;
}
export const ModalContact = (
  {
    ci,
    nombre,
    correo,
    telefono,
    onClose,
    handlerSubmit,
  }: contactProps,
) => {
  return (
    <div className="relative w-full">
      <div class="overflow-y-auto  w-full bg-white border-2 shadow-2xl rounded-2xl flex flex-col items-center relative p-8">
        <button
          class="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500"
          onClick={onClose}
          type="button"
          aria-label="Cerrar"
        >
          ×
        </button>
        <h1 class="mb-6 text-2xl font-bold text-[#658895]">
          Mandar mensaje a <span class="text-[#e4c36f]">{nombre}</span>
        </h1>
        <form
          onSubmit={handlerSubmit}
          class="w-full flex flex-col gap-4"
        >
          <input type="hidden" name="ciUsr" id="ciUsr" value={ci} required />
          <input
            type="hidden"
            name="correoUsr"
            id="correoUsr"
            value={correo}
            required
          />
          <input
            type="hidden"
            name="telefonoUsr"
            id="telefonoUsr"
            value={telefono}
            required
          />
          <input
            type="hidden"
            name="nombreUsr"
            id="nombreUsr"
            value={nombre}
            required
          />
          <SelectUI
            id="metodo"
            titulo="Seleccione el método"
            desactivar={false}
            opciones={[
              { text: "Correo", valor: "correo" },
              { text: "Whatsapp", valor: "whatsapp" },
            ]}
            escala="full"
            classCLS=""
          />
          <SelectUI
            id="asunto"
            titulo="Seleccione el asunto"
            desactivar={false}
            opciones={[
              { text: "Consulta", valor: "consulta" },
              { text: "Respuesta", valor: "respuesta" },
              { text: "Problemas", valor: "problemas" },
              { text: "Proyecto", valor: "proyecto" },
            ]}
            escala="full"
            classCLS=""
          />
          <div>
            <label htmlFor="contenido" class="block mb-1">Contenido</label>
            <textarea
              id="contenido"
              name="contenido"
              rows={6}
              class="w-full border rounded p-2 text-black"
            />
          </div>
          <button
            type="submit"
            class="bg-[#658895] text-white rounded py-2 font-semibold hover:bg-[#4a6a75] transition"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};
