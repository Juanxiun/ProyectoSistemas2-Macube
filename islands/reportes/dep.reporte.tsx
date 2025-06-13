import { useEffect, useRef, useState } from "preact/hooks";
import { typeDepartamento } from "../../services/reportes/reporteDep.ts";

declare global {
  interface Window {
    Chart: any;
  }
}

export default function ReporteDepartamento({ arq }: { arq: string }) {
  const [data, setData] = useState<typeDepartamento[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/reportesApi?arq=${arq}&tipo=departamento`);
      const result = await res.json();
      setData(result.data ?? []);
    };
    fetchData();
  }, [arq]);

  useEffect(() => {
    if (!data.length) return;
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
    if (!chartRef.current || !window.Chart || !data.length) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const labels = data.map((d) => d.departamento);
    const construccion = data.map((d) => d.construccion);
    const inspecciones = data.map((d) => d.inspecciones);

    chartInstance.current = new window.Chart(chartRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Construcción",
            data: construccion,
            backgroundColor: "#658895",
          },
          {
            label: "Inspecciones",
            data: inspecciones,
            backgroundColor: "#e4c36f",
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: { position: "bottom" },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  if (!data.length) return <div>No hay datos de departamentos.</div>;

  // Departamento con más construcciones e inspecciones
  const maxConstruccion = data.reduce((
    a,
    b,
  ) => (a.construccion > b.construccion ? a : b));
  const maxInspeccion = data.reduce((
    a,
    b,
  ) => (a.inspecciones > b.inspecciones ? a : b));

  return (
    <div>
      <div class="bg-[#658895] w-full h-[70px] rounded-t-xl">
        <h2 class="text-xl text-white text-center font-bold">
          Reporte por Departamento
        </h2>
      </div>
      <div class="w-full h-full p-4">
        <div class="flex justify-center">
          <div class="w-[620px] h-[460px]">
            <canvas ref={chartRef} width={600} height={420}></canvas>
          </div>
        </div>
        <div class="mt-4 w-full flex justify-center">
          <table class="w-[90%] text-sm border border-gray-200 rounded">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-2 py-1 border-b">Departamento</th>
                <th class="px-2 py-1 border-b">Total Proyectos</th>
                <th class="px-2 py-1 border-b">Construcción</th>
                <th class="px-2 py-1 border-b">Inspecciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.departamento}>
                  <td class="px-2 py-1 border-b">{item.departamento}</td>
                  <td class="px-2 py-1 border-b text-center">
                    {item.total_proyectos}
                  </td>
                  <td class="px-2 py-1 border-b text-center">
                    {item.construccion}
                  </td>
                  <td class="px-2 py-1 border-b text-center">
                    {item.inspecciones}
                  </td>
                </tr>
              ))}
              <tr class="bg-yellow-100 font-semibold">
                <td class="px-2 py-1 border-b">Más construcciones</td>
                <td class="px-2 py-1 border-b text-center" colSpan={3}>
                  {maxConstruccion.departamento}
                </td>
              </tr>
              <tr class="bg-yellow-100 font-semibold">
                <td class="px-2 py-1 border-b">Más inspecciones</td>
                <td class="px-2 py-1 border-b text-center" colSpan={3}>
                  {maxInspeccion.departamento}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
