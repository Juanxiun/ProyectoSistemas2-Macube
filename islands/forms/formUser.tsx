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
          if (!res.ok) setMessage("error", `usuario: ${res.status}`);
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
      setMessage("error", `usuario: ${error}`);
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
        setMessage("completado", ` ${data.message} reniniciando sesion...`);
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
    <form class="user_form" onSubmit={handlerSubmit}>
      <h1 class="user_form_h1">
        CLIENTES
      </h1>
      <div
        onClick={() => {
          setEdit((p) => !p);
        }}
      >
        <span>Editar</span>
      </div>
      <div>
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
        <div class={edit? "opacity-0" : "user_form_btn"}>
          <button class="formProyecto_btn"  type="submit">
            actualizar
          </button>
        </div>
      </div>
    </form>
  );
}
