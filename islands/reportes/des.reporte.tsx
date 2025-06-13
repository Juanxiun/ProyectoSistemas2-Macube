import { useState } from "preact/hooks";
import { setMessage } from "../../lib/message/metodosMsg.ts";

interface DescargaReporteProps {
  arq: string;
  nombre: string;
}

export default function DescargaReporte({ arq, nombre }: DescargaReporteProps) {
  const [descargando, setDescargando] = useState(false);

  const handleDescarga = async () => {
    setDescargando(true);
    try {
      const res = await fetch(
        `/api/reportesApi?arq=${arq}&tipo=descarga&nombre=${
          encodeURIComponent(nombre)
        }`,
      );
      const result = await res.json();
      if (result?.data?.url) {
        // Usar el método de descarga de lib/utils/descargaArc.ts
        const link = document.createElement("a");
        link.href = result.data.url;
        link.setAttribute(
          "download",
          `REPORTES_DE_MIS_PROYECTOS_${nombre}.pdf`,
        );
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setMessage("error", "No se pudo generar el reporte...");
      }
    } catch (e) {
      setMessage("error", `Error en la descarga ${e}`);
    }
    setDescargando(false);
  };

  return (
    <button
      type="button"
      class="bg-[#658895] hover:bg-[#4a6a7b] text-white font-bold py-2 px-4 rounded transition"
      onClick={handleDescarga}
      disabled={descargando}
    >
      {descargando ? "Descargando..." : "Descargar Reporte PDF"}
    </button>
  );
}
