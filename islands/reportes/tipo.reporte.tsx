import { useEffect, useRef, useState } from "preact/hooks";
import { typeProyectoTipo } from "../../services/reportes/reporteTipo.ts";

declare global {
  interface Window {
    Chart: any;
  }
}

export default function ReporteTipo({ arq }: { arq: string }) {
  const [data, setData] = useState<typeProyectoTipo | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/reportesApi?arq=${arq}&tipo=tipo`);
      const result = await res.json();
      setData(result.data ?? null);
    };
    fetchData();
  }, [arq]);

  useEffect(() => {
    if (!data) return;
    if (typeof window.Chart === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.onload = () => renderChart();
      document.body.appendChild(script);
    } else {
      renderChart();
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function renderChart() {
    if (!chartRef.current || !window.Chart || !data) return;
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new window.Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Construcción", "Inspección"],
        datasets: [
          {
            label: "Cantidad de Proyectos",
            data: [data.construccion, data.inspeccion],
            backgroundColor: ["#658895", "#e4c36f"],
            borderColor: ["#3a4d5c", "#bfa14a"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: { mode: "index", intersect: false },
        },
        cutout: "65%",
      },
    });
  }

  if (!data) return <div>No hay datos de tipos de proyecto.</div>;

  // Determinar el tipo de proyecto que más genera (por monto)
  const tipoMasGenera = data.total_precio_proy > data.total_precio_insp
    ? { tipo: "Construcción", monto: data.total_precio_proy }
    : { tipo: "Inspección", monto: data.total_precio_insp };

  return (
    <div>
      <div class="bg-[#658895] w-full h-[70px] rounded-t-xl">
        <h2 class="text-xl text-white text-center font-bold">Reporte por Tipo de Proyecto</h2>
      </div>
      <div class="w-full h-full p-4">
        <div class="flex justify-center">
          <div class="w-[320px] h-[320px]">
            <canvas ref={chartRef} width={300} height={300}></canvas>
          </div>
        </div>
        <div class="mt-4 w-full flex justify-center">
          <table class="w-[90%] text-sm border border-gray-200 rounded">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-2 py-1 border-b">Tipo</th>
                <th class="px-2 py-1 border-b">Cantidad</th>
                <th class="px-2 py-1 border-b">Monto Total (BOB)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-2 py-1 border-b">Construcción</td>
                <td class="px-2 py-1 border-b text-center">
                  {data.construccion}
                </td>
                <td class="px-2 py-1 border-b text-center">
                  {data.total_precio_proy.toLocaleString("es-BO", {
                    style: "currency",
                    currency: "BOB",
                  })}
                </td>
              </tr>
              <tr>
                <td class="px-2 py-1 border-b">Inspección</td>
                <td class="px-2 py-1 border-b text-center">
                  {data.inspeccion}
                </td>
                <td class="px-2 py-1 border-b text-center">
                  {data.total_precio_insp.toLocaleString("es-BO", {
                    style: "currency",
                    currency: "BOB",
                  })}
                </td>
              </tr>
              <tr class="bg-yellow-100 font-semibold">
                <td class="px-2 py-1 border-b">Tipo que más genera</td>
                <td class="px-2 py-1 border-b text-center" colSpan={2}>
                  {tipoMasGenera.tipo}{" "}
                  ({tipoMasGenera.monto.toLocaleString("es-BO", {
                    style: "currency",
                    currency: "BOB",
                  })})
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
