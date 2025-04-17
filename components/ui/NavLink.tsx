interface dataProps {
    id: string;
    url: string;
    text: string;
    styleCls?: string;
  }
  
  export function Navlink({ id, url, text, styleCls }: dataProps) {
    return <a id={id} name={id} href={url} class={styleCls ? styleCls : "default-link"}>{text}</a>;
  }
  