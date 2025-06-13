import { InputUI } from "../UI/InputUI.tsx";

interface codPassProp{
    res: string;
    userId: string;
    // deno-lint-ignore no-explicit-any
    validMSJ: any;
}

export const ValCodPass = (
    { res, userId, validMSJ } : codPassProp
) => {
  return (
    <div className="w-full mt-4 bg-[#f8fafc] rounded-lg shadow-inner p-6 flex flex-col items-center space-y-3">
      <h1 className="text-xl font-bold text-[#393a44] mb-1">
        Ingrese el código que mandamos a su correo
      </h1>
      <p className="text-sm text-gray-600 mb-2">Solo tiene 5 minutos</p>
      {res === "No" && (
        <p className="text-lg text-red-600 font-semibold">
          Código incorrecto
        </p>
      )}
      <form
        className="w-full flex flex-col items-center space-y-3"
        onSubmit={validMSJ}
      >
        <InputUI
          id="codigo_email"
          titulo="Condigo de restablecimiento "
          tipo="text"
          valor=""
          noEdit={false}
          necesario
          classCLS="inptRegistro"
        />
        <InputUI
          id="id_usr"
          titulo="Ingrese su codigo de usuario"
          tipo="hidden"
          valor={userId}
          noEdit={false}
          necesario
          classCLS=""
        />

        <button
          type="submit"
          className="bg-[#e4c36f] hover:bg-[#bfa14e] text-[#393a44] font-semibold py-2 px-6 rounded transition"
        >
          Validar
        </button>
      </form>
    </div>
  );
};
