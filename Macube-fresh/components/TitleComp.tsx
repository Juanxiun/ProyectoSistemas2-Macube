interface Props {
  title: string;
  style?: string;
}

export default function TitleComp({ title, style }: Props) {
  return (
    <h1 class={style ? style : "TitleDefault"}>
      {title}
    </h1>
  );
}
