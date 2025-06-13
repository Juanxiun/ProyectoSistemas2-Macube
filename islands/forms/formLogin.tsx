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
        setMessage("completado", data.message);
        globalThis.location.href = "/proyecto";
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

  const redirectPass = () => {
    globalThis.location.href = "/sesion/lostPass";
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
      <div class="w-full flex justify-end">
        <span
          onClick={redirectPass}
          class="text-lg cursor-pointer hover:underline my-2"
        >
          Olvide mi contraseña?
        </span>
      </div>

      <div class="login_cont_btn text-black">
        <button class="login_btn" type="submit">
          Iniciar Sesion
        </button>
        <div class="my-4 w-full flex justify-center align-middle items-center">
          <span>
            No tengo una cuenta, quiero{" "}
            <a class="login_link text-[#e4c36f]" onClick={handlerAnim}>
              Registrarme
            </a>
          </span>
        </div>
      </div>
    </form>
  );
}
