import { options } from "preact/src/index.d.ts";

interface options {
  text: string;
  value: string;
}

interface dataProps {
  id: string;
  titulo?: string;
  opciones: options[];
  classSTL?: string; 
  // deno-lint-ignore no-explicit-any
  onSelect?: any;
}

export function SelectElement({ id, titulo, opciones, classSTL, onSelect }: dataProps) {
  return (
    <div class={classSTL}>
      <label htmlFor={id}>{titulo}</label>
      <select name={id} id={id} onClick={onSelect}>
        {opciones.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.text.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
