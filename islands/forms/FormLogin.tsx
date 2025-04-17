import { useState } from "preact/hooks/";
import { InputElement } from "../../components/element/InputElement.tsx";
import { MessageElement } from "../../components/element/MessageElement.tsx";
import { TitleComp } from "../../components/ui/TitleComp.tsx";

export function LoginForm() {
  const [msj, setMsj] = useState<string>("");

  const handlerSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/session/login/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      setMsj("BIENVENIDO. espere mientras iniciamos sesion...");
      setTimeout(() => globalThis.location.href = "/", 1500);
    } catch (error) {
      setMsj(
        `${error instanceof Error ? error.message : "Error desconocido"}`,
      );
    }
  };

  console.log(msj.includes("ERROR"));

  return (
    <div className={`h-full w-1/2`}>
      <div class="message">
        {msj &&
          (
            <MessageElement
              message={msj}
              typeM={msj.includes("BIENVENIDO.") ? true : false}
            />
          )}
      </div>
      <form onSubmit={handlerSubmit} class="login-form">
        <div class="login-form-cont">
          <TitleComp title="INICIO DE SESION" styleCls="login-title" />

          <div class="login-form-cont-data">
            <InputElement
              tipo="text"
              titulo="Nombre de usuario"
              id="codigo"
              requerido
            />

            <InputElement
              tipo="password"
              titulo="Contraseña"
              id="pass"
              requerido
            />
          </div>

          <div class="login-form-cont-btn">
            <button type="submit">
              INICIAR SESION
            </button>

            <a href="/session/registro">REGISTRATE</a>
          </div>
        </div>
      </form>
    </div>
  );
}
