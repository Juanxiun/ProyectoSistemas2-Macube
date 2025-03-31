interface dataProps {
  title: string;
  styleCls?: string;
}

export function TitleComp({ title, styleCls }: dataProps) {
  return <h1 class={styleCls ? styleCls : "default-title"}>{title}</h1>;
}
