import { useState } from "preact/hooks/";
import { InputUI } from "../../components/UI/InputUI.tsx";
import { setMessage } from "../../lib/message/metodosMsg.ts";

export default function FormLogin() {
  const [anim, setAnim] = useState(false);

  const handlerOnSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/usrApi/loginRest", {
        method: "POST",
        body: formData,
      });
      if (res.status === 400) {
        const errorData = await res.json();
        setMessage("error", errorData.error);
      }
      console.log("res", res);
      if (res.status === 200) {
        const data = await res.json();
        setMessage("error", data.message);
        globalThis.location.href = "/";
      }
    } catch (error) {
      console.log("ERROR al iniciar sesion\n", error);
    }
  };
  const handlerAnim = () => {
    setAnim((prop) => !prop);
    setTimeout(() => {
      globalThis.location.href = "/sesion/registro";
    }, 1500);
  };

  return (
    <form onSubmit={handlerOnSubmit} class={anim ? "loginAnim" : "login"}>
      <h1 class="login_ti">
        INICIO DE SESION
      </h1>
      <InputUI
        id="codigo"
        titulo="Codigo de Usuario:"
        tipo="text"
        valor=""
        noEdit={false}
        necesario
        classCLS="login_inpt"
      />

      <InputUI
        id="pass"
        titulo="Contraseña:"
        tipo="password"
        valor=""
        noEdit={false}
        necesario
        classCLS="login_inpt"
      />
      <p>no me acuerdo mi contraseña</p>

      <div class="login_cont_btn text-black">
        <button class="login_btn" type="submit">
          Iniciar Sesion
        </button>
        <a class="login_link" onClick={handlerAnim}>
          Registrarse
        </a>
      </div>
    </form>
  );
}
