interface opcionesProps {
  text: string;
  valor: string;
}

interface selectProps {
  id: string;
  titulo: string;
  opciones: opcionesProps[];
  desactivar?: boolean;
  escala: "full" | "1/2" | "1/3" | "1/4" | "2/3"; 
  classCLS?: string;
  // deno-lint-ignore no-explicit-any
  onclick?: any;
}

export function SelectUI(
  { id, titulo, opciones, desactivar, escala, classCLS, onclick }: selectProps,
) {
  return (
    <div class={`
      w-${escala} flex flex-col my-3 px-2 ${classCLS}
    `} required>
      <label class={titulo=="."? "opacity-0" : "text-black font-bold text-lg text-center"} htmlFor={id}>{titulo}</label>
      <select 
      class="
      py-[11.5px] rounded-lg text-black bg-[#c7c7c7]"
      name={id} id={id} disabled={desactivar} onClick={onclick}>
        {opciones.map((op) => (
          <option key={op.valor} value={op.valor}>{op.text}</option>
        ))}
      </select>
    </div>
  );
}
