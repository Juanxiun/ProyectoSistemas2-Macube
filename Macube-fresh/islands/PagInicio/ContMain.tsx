import TextComp from "../../components/TextComp.tsx";
import TitleComp from "../../components/TitleComp.tsx";

interface Props {
  Title: string;
  Title2?: string;
  Text: string;
  Style: string;
}

export default function ContMain({Title, Title2, Text, Style}: Props) {
  


  const defStyleTitle = Style === "ArticlePres" ? "TitleMain" : "TitleCtx";
  const defStyleText = Style === "ArticlePres" ? "TextMain" : "TextCtx";

  return (
    <div class={Style}>
      <div>
        <div id="ContTitle">
          {Title2 ? <h2 id="tituloMain" class="Title2">{Title2}</h2> : ("")}
          <TitleComp title={Title} style={defStyleTitle} />
        </div>

        <div id="ContText">
          <TextComp text={Text} style={defStyleText} />
        </div>
      </div>
    </div>
  );
}
