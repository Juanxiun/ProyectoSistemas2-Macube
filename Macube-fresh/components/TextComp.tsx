interface Props {
  text: string;
  style?: string;
}

export default function TextComp({ text, style }: Props) {
  return (
    <h1 class={style ? style : "TextDefault"}>
      {text}
    </h1>
  );
}
