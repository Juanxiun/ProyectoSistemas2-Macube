export interface CambiosDOM {
  titulo?: string;
  tituloMain?: string;
  texto?: string;
  estilo?: string;
}

export function Cambio(tipo: string) {
  console.log(" asdasd ", tipo);
}

export const Presentacion = (): CambiosDOM => {
    return{
        titulo: "MACUBE",
        tituloMain: "DISEÑO Y ARTE",
        texto: `transformaremos tu sueño 
                  en un proyecto REAL combinando
                  diseño, arte y precision tecnica`,
        estilo: "ArticlePres"
    }
}

export function Trabajos() {
    return{
        titulo: "BIENVENIDO",
        tituloMain: "",
        texto: `Te acompañamos en cada etapa de tu obra, 
                brindando asesoramiento experto y soluciones eficientes. 
                Contamos con arquitectos de gran trayectoria, comprometidos 
                en hacer realidad tus ideas con calidad y precisión.`,
        estilo: "ArticleMid"
    }
}

export function Cita() {
    return{
        titulo: "CONTACTANOS",
        tituloMain: "",
        texto: ``,
        estilo: "ArticleEnd"
    }
}
