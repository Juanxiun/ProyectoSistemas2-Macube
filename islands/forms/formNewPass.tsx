import { useState } from "preact/hooks";
import { InputUI } from "../../components/UI/InputUI.tsx";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { FormPass } from "../../components/Element/formNewPass.tsx";
import { ValCodPass } from "../../components/Element/valCodPass.tsx";
interface newPassProp {
  id?: string;
}

export default function FormNewPass({ id }: newPassProp) {
  const [enviado, setEnviado] = useState<boolean>(false);
  const [res, setRes] = useState<string>("");
  const [off, setoff] = useState<boolean>(true);
  const [userId, setUserId] = useState(id ?? "");

  const estadoEnvio = async () => {
    let currentId = userId;
    if (!currentId || currentId.length === 0) {
      const codigo =
        (document.getElementById("id_usr_login") as HTMLInputElement)?.value;
      currentId = codigo;
      setUserId(codigo);
    }
    try {
      //console.log(currentId);
      const response = await fetch(`/api/usrApi/passRest?id=${currentId}`);
      const data = await response.json();
      if (data.value === "OK") {
        setEnviado(true);
        setRes("");
      } else {
        setRes("No");
      }

      setTimeout(() => {
        const value = async () => {
          try {
            const res = await fetch(`/api/dropCod?id=${currentId}`);
            const data = await res.json();
            if (res.status === 400) {
              setMessage("error", `ERROR, ${data.error}`);
            }

            if (res.status === 200) {
              setMessage("alerta", `ALERTA, codigo de solicitud expirado`);
            }
          } catch (e) {
            setMessage("error", `ERROR, ${e}`);
          }
        };
        value();
      }, 5 * 60 * 1000);
    } catch (e) {
      console.log(e);
      setMessage("error", `Error, ${e}`);
    }
  };

  const validMSJ = async (e: Event) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const res = await fetch(`/api/usrApi/passRest`, {
        method: "POST",
        body: formData,
      });
      const respuestas = await res.json();
      if (res.status === 400) {
        setMessage("error", `ERROR, ${respuestas.res}`);
      }
      if (res.status === 200) {
        setMessage("completado", "Codigo valido.");
        await fetch(`/api/dropCod?id=${userId}`);
        setoff(false);
      }
    } catch (e) {
      console.log(e);
      setMessage("error", `Error, ${e}`);
    }
  };

  const handlerSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/usrApi/passRest", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.status === 400) {
        setMessage("error", `ERROR, ${data.error}`);
      }
      if (res.status === 200) {
        setMessage("completado", `Reniniciando sesion...`);
        setTimeout(() => {
          globalThis.location.href = "/sesion/logout";
        }, 2000);
      }
    } catch (e) {
      console.log(e);
      setMessage("error", `Error, ${e}`);
    }
  };

  return (
    <div className=" bg-white rounded-lg shadow-lg w-[500px]">
      <div class="w-full py-5 bg-[#658895] rounded-t-lg">
        <p class="text-center text-2xl font-bold">CAMBIAR CONTRASEÑA</p>
      </div>
      <div className="flex flex-col items-center space-y-4  py-6">
        {enviado === false && (
          <div>
            {id && id?.length > 0
              ? (
                <button
                  type="button"
                  onClick={estadoEnvio}
                  className="bg-[#658895] hover:bg-[#4a6a75] text-white font-semibold py-2 px-6 rounded transition"
                >
                  Enviar código por EMAIL
                </button>
              )
              : solicitarCodigo(estadoEnvio)}
          </div>
        )}

        {enviado && off === true && (
          <ValCodPass
            res={res}
            userId={userId}
            validMSJ={validMSJ}
          />
        )}
      </div>

      {off === false &&
        (
          <FormPass
            off={off}
            handlerSubmit={handlerSubmit}
          />
        )}
    </div>
  );
}

const solicitarCodigo = (
  estadoEnvio: () => Promise<void>,
) => {
  return (
    <div class="w-full">
      <InputUI
        id="id_usr_login"
        titulo="Ingrese su codigo de usuario"
        tipo="text"
        valor=""
        noEdit={false}
        necesario
        classCLS=""
      />
      <button
        type="button"
        onClick={estadoEnvio}
        className="bg-[#658895] hover:bg-[#4a6a75] text-white font-semibold py-2 px-6 rounded transition"
      >
        Enviar código por EMAIL
      </button>
    </div>
  );
};
