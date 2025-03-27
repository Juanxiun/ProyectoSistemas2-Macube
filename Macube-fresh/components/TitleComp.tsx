interface Props {
  id?: string;
  title: string;
  style?: string;
}

export default function TitleComp({ id, title, style }: Props) {
  return (
    <h1 id={id} class={style ? style : "TitleDefault"}>
      {title}
    </h1>
  );
}
