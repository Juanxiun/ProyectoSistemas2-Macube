import { useEffect, useState } from "preact/hooks";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { typeContactos } from "../../type/typeUsuarios.ts";
import { ModalContact } from "../../components/Modal/modalContact.tsx";

interface PageProps {
  id: string;
}

export function PageContactos(
  { id }: PageProps,
) {
  const [cont, setCont] = useState<typeContactos[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [contactoNombre, setContactoNombre] = useState<string>("");
  const [ci, setCi] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  useEffect(() => {
    const data = async () => {
      const value = await callContactos(id);
      setCont(value);
    };
    data();
  }, [id]);

  const handleOpenModal = (
    ci: string,
    nombre: string,
    correo: string,
    telefono: string,
  ) => {
    setContactoNombre(nombre);
    setCi(ci);
    setCorreo(correo);
    setTelefono(telefono);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setContactoNombre("");
    setCi("");
    setCorreo("");
    setTelefono("");
  };

  return (
    <div className="relative w-full h-full ">
      {showModal && (
        <div className="absolute w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-lg">
          <div className="w-full max-w-lg">
            <ModalContact
              ci={ci}
              nombre={contactoNombre}
              correo={correo}
              telefono={telefono}
              onClose={handleCloseModal}
              handlerSubmit={handlerSubmit}
            />
          </div>
        </div>
      )}
      <div className="
        w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 px-6 overflow-y-auto">
        {cont.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No hay contactos registrados.
          </div>
        )}
        {cont.map((c) => (
          <div
            key={c.telefono}
            className="bg-white rounded-xl h-[170px] shadow-lg p-6 flex flex-col gap-2 cursor-pointer hover:bg-[#f3f3f3] transition border border-[#e4c36f]/30"
            onClick={() =>
              handleOpenModal(c.ci, c.nombre, c.correo, c.telefono)}
          >
            <span className="font-bold text-[#658895] text-lg">{c.nombre}</span>
            <span className="text-sm text-gray-700 break-all">
              Correo: {c.correo}
            </span>
            <span className="text-sm text-gray-700">
              Teléfono: {c.telefono}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const callContactos = async (id: string) => {
  try {
    const res = await fetch(`/api/usrApi/contRest?id=${id}`);
    const result = await res.json();
    if (res.status === 400) setMessage("error", `${result.error}`);
    if (res.status === 200) return result.res;
    else return [];
  } catch (e) {
    console.log(e);
    setMessage("error", `Error. ${e}`);
  }
};

const handlerSubmit = async (e: Event) => {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);

  try {
    const res = await fetch("/api/usrApi/contRest", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (res.status === 200) setMessage("completado", "Mensaje enviado");
    if (res.status === 400) setMessage("error", `Error, ${result.error}`);
  } catch (error) {
    console.log(error);
    setMessage("error", `ERROR, ${error}`);
  }
};
