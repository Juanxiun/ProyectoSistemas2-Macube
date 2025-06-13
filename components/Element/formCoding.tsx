import { useEffect, useState } from "preact/hooks";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { InputUI } from "../UI/InputUI.tsx";
import { setLoadBlock } from "../../lib/utils/displayBlock.ts";

export const FormCodigo = () => {
  const [block, setBlock] = useState<boolean>(true);

  useEffect(() => {
    setLoadBlock(block);
  }, [block]);

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/emailApi/emailRest", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.status === 400) {
        setMessage("error", `Error. ${data.error}`);
      }
      if (res.status === 200) {
        setBlock(false);
        setLoadBlock(false);
      }
    } catch (e) {
      console.log(e);
      setMessage("error", `ERROR. ${e}`);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      class={`bg-white border-2 w-[25%] rounded-lg shadow-lg ${
        block ? "z-50" : "-z-50"
      }`}
    >
      <h1 class="py-4 text-center text-xl text-black">CODIGO DE ACCESO</h1>
      <InputUI
        id="emailUsr"
        titulo="Ingrese su correo"
        tipo="email"
        valor=""
        noEdit={false}
        necesario
        classCLS=""
      />
      <InputUI
        id="codUsr"
        titulo="Codigo"
        tipo="number"
        valor=""
        noEdit={false}
        necesario
        classCLS=""
      />

      <div class="w-full h-32 flex justify-center align-middle items-center">
        <button
          type="submit"
          class="bg-[#658895] rounded-lg px-4 py-3 text-white"
        >
          Validar codigo
        </button>
      </div>
    </form>
  );
};
