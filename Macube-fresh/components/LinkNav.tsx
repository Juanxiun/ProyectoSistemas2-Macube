interface propsLink{
  url: string;
  text: string;
  style? : string;
}

export function LikNav({url, text, style} : propsLink){
  return(
      <a style={style} href={url}>
          {text}
      </a>
  );
} 