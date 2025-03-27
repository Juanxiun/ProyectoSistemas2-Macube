import { JSX } from "preact";


interface propsLink{
    id? : string;
    text: string;
    style? : string;
    eventClick? : JSX.HTMLAttributes<HTMLButtonElement>;
  }
  
  export function ButtomNav({id, text, style, eventClick} : propsLink){

    return(
        <button {...eventClick} type="button"  id={id} class={style} >
            {text}
        </button>
    );
  } 