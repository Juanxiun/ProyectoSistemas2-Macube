import { useState } from "preact/hooks/";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { FormUserElement } from "../../components/Element/formUserN.tsx";
export default function FormRegistro() {
  const [anim, setAnim] = useState(false);

  const handlerOnSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/usrApi/userRest", {
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
        globalThis.location.href = "/proyecto/";
      }
    } catch (error) {
      console.log("ERROR al iniciar sesion\n", error);
    }
  };

  const handlerAnim = () => {
    setAnim((prop) => !prop);
    setTimeout(() => {
      globalThis.location.href = "/sesion/login";
    }, 1500);
  };
  return (
    <form
      class={anim ? "registroAnim" : "registro"}
      action=""
      onSubmit={handlerOnSubmit}
    >
      <h1 class="registro_ti">REGISTRO</h1>
      <FormUserElement noedit= {false}/>

      <div class="registro_cont_btn">
        <button class="registro_btn" type="submit">
          REGISTRARSE
        </button>
        <a class="registro_link" onClick={handlerAnim}>ir al login</a>
      </div>
    </form>
  );
}
