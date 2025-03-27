interface propsLink{
  id? : string;
  url: string;
  text: string;
  style? : string;
}

export function LikNav({id, url, text, style} : propsLink){
  return(
      <a id={id} class={style} href={url}>
          {text}
      </a>
  );
} 