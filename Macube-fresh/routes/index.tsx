import Footer from "../islands/Footer.tsx";
import NavBar from "../islands/NavBar.tsx";
import ContMain from "../islands/PagInicio/ContMain.tsx";

export default function Home() {
  return (
    <div class="Index">
      <div class="Body">
        <NavBar />

        <ContMain
          Title="MACUBE" 
          Title2="DISEÑO Y ARTE"
          Text=" transformaremos tu sueño 
                  en un proyecto REAL combinando
                  diseño, arte y precision tecnica"
          Style="ArticlePres"
        />
      </div>

      <div class="Body1">
        <ContMain
          Title="BIENVENIDO"
          Text="Te acompañamos en cada etapa de tu obra, 
                brindando asesoramiento experto y soluciones eficientes. 
                Contamos con arquitectos de gran trayectoria, comprometidos 
                en hacer realidad tus ideas con calidad y precisión."
          Style="ArticleMid"
        />
      </div>

      <div class="Body1">
        <ContMain
          Title="CONTACTANOS"
          Text="contactanos en ... xd aun falta pipipi"
          Style="ArticleEnd"
        />

        <Footer/>
      </div>
    </div>
  );
}
