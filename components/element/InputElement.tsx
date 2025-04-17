interface InputProps {
  tipo: string;
  titulo: string;
  id: string;
  requerido: boolean;
  defecto?: string;
  editable?: boolean | false;
  // deno-lint-ignore no-explicit-any
  onchage?: any; 
  accept?: string;
  classSTL?: string;
}

export function InputElement(
  { tipo, titulo, id, requerido, defecto, editable, onchage, accept, classSTL }: InputProps,
) {
  return (
    <div class={classSTL? classSTL : "input_elm"}>
      <label htmlFor={id}>{titulo}</label>
      <input
        type={tipo}
        name={id}
        id={id}
        value={defecto}
        required={requerido}
        readOnly={editable}
        onChange={onchage}
        accept={accept}
      />
      
    </div>
  );
}
