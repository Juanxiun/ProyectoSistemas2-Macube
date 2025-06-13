import { useEffect, useState } from "preact/hooks/";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { FormUserElement } from "../../components/Element/formUserN.tsx";

interface userProps {
  codigo?: string;
  ci?: string;
  extension?: string;
  nombre?: string;
  apellido?: string;
  departamento?: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
  contrasena?: string;
}

interface Props {
  user: string;
}

export default function FormUser(
  { user }: Props,
) {
  const [userD, setUserD] = useState<userProps[]>([]);
  const [edit, setEdit] = useState<boolean>(true);

  useEffect(() => {
    try {
      const fethProy = async () => {
        if (user.length > 0) {
          const res = await fetch(`/api/usrApi/userRest?id=${user}`);
          if (!res.ok) setMessage("error", `Usuario: ${res.status}`);
          const usr = await res.json();
          setUserD(usr.result);
          console.log(usr.result);
        } else {
          setMessage("error", "Usuario no asignado redirigiendo...");
          setTimeout(() => {
            globalThis.location.href = "/sesion/login";
          }, 2000);
        }
      };
      fethProy();
    } catch (error) {
      setMessage("error", `Usuario: ${error}`);
      throw error;
    }
  }, [user]);

  const handlerSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/usrApi/userRest", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.status === 400) {
        const errorData = await res.json();
        setMessage("error", errorData.error);
      }
      if (res.status === 200) {
        setMessage("completado", ` ${data.message} Reniniciando sesion...`);
        setTimeout(() => {
          globalThis.location.href = "/sesion/logout";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setMessage("error", `usuario: ${error}`);
      throw error;
    }
  };

  return (
    <form
      class="formProyecto relative"
      onSubmit={handlerSubmit}
    >
      <h1 class="bg-[#658895] w-full text-center font-bold text-white text-2xl py-4 rounded-t-xl">
        CLIENTES
      </h1>
      <div
        onClick={() => {
          setEdit((p) => !p);
        }}
        class="bg-white
          w-12 h-12 
          rounded-full p-2 
          cursor-pointer 
          absolute right-2 top-2
          flex justify-center 
          align-middle items-center
          hover:bg-[#e4c36f]"
      >
        <img src="/assets/carts/lapiz.svg" height={30} width={30} alt="" />
      </div>
      <div class="formProyecto_cont lg:px-2 md:px-4 px-4">
        <div class="formProyecto_cont_form">
          <FormUserElement
            codigo={userD[0]?.codigo}
            ci={userD[0]?.ci}
            extension={userD[0]?.extension}
            nombre={userD[0]?.nombre}
            apellido={userD[0]?.apellido}
            departamento={userD[0]?.departamento}
            direccion={userD[0]?.direccion}
            telefono={userD[0]?.telefono}
            correo={userD[0]?.correo}
            noedit={edit}
          />
        </div>
      </div>
      {!edit && (
        <div class="formProyecto_cont_btn">
          <button class="formProyecto_btn" type="submit">
            Actualizar
          </button>
        </div>
      )}
    </form>
  );
}