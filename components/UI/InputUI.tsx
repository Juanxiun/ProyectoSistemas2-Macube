interface inpProps {
  id: string;
  titulo: string;
  tipo: string;
  valor: string;
  noEdit: boolean;
  necesario: boolean | true;
  classCLS?: string;
  // deno-lint-ignore no-explicit-any
  onInput?: any;
  // deno-lint-ignore no-explicit-any
  accept?: any;
}

export function InputUI(
  { id, titulo, tipo, valor, noEdit, necesario, classCLS, onInput, accept }: inpProps,
) {
  return (
    <div class="
      flex flex-col w-full my-3 px-2 
    ">
      <label class="text-black font-bold text-lg text-center" htmlFor={id}>
        {titulo}
      </label>
      <input
        type={tipo}
        name={id}
        id={id}
        value={valor}
        disabled={noEdit}
        required={necesario}
        onInput={onInput}
        class={`
          bg-[#c7c7c7]
          py-2 px-3 rounded-lg
          focus:outline-none 
          text-black ${classCLS}`}
        accept={accept}
      />
    </div>
  );
}
