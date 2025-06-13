import { InputUI } from "../UI/InputUI.tsx";

interface passFormProps{
    off: boolean;
    // deno-lint-ignore no-explicit-any
    handlerSubmit: any;
}

export const FormPass = (
    {off, handlerSubmit}:  passFormProps
) => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handlerSubmit}
    >
      <InputUI
        id="pass_new"
        titulo="Contraseña"
        tipo="password"
        valor=""
        noEdit={off}
        necesario
        classCLS="inptRegistro"
      />

      <InputUI
        id="pass_conf_new"
        titulo="Confirmar contraseña"
        tipo="password"
        valor=""
        noEdit={off}
        necesario
        classCLS="inptRegistro"
      />

      <InputUI
        id="pass_id_usr"
        titulo=""
        tipo="hidden"
        valor=""
        noEdit
        necesario
        classCLS="inptRegistro"
      />

      <div class="w-full flex justify-center align-middle items-center py-4">
        <button
          type="submit"
          className="bg-[#e4c36f] hover:bg-[#bfa14e] text-[#393a44] font-semibold py-2 px-6 rounded transition"
        >
          Actualizar contraseña
        </button>
      </div>
    </form>
  );
};
