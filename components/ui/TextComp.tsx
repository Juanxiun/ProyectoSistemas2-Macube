interface dataProps {
    text?: string;
    styleCls?: string;
  }
  
  export function TextComp({ text, styleCls }: dataProps) {
    return <p class={styleCls ? styleCls : "default-text"}>{text}</p>;
  }
  