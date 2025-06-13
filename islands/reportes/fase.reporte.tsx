import { useEffect, useRef, useState } from "preact/hooks";
import { typeFase } from "../../services/reportes/reporteFase.ts";

declare global {
  interface Window {
    Chart: any;
  }
}

export default function ReporteFase({ arq }: { arq: string }) {
  const [data, setData] = useState<typeFase | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/reportesApi?arq=${arq}&tipo=fase`);
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

    const labels = [
      "Conflicto",
      "Inicial",
      "Desarrollo",
      "Legalización",
      "Final",
    ];
    const values = [
      data.fases_conflicto,
      data.fases_inicial,
      data.fases_desarrollo,
      data.fases_legalizacion,
      data.fases_final,
    ];
    chartInstance.current = new window.Chart(chartRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Cantidad de Fases",
            data: values,
            backgroundColor: [
              "#f7786b",
              "#a7c7e7",
              "#658895",
              "#e4c36f",
              "#b5ead7",
            ],
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  if (!data) return <div>No hay datos de fases.</div>;

  // Determinar la fase más concurrente
  const fases = [
    { nombre: "Conflicto", valor: data.fases_conflicto },
    { nombre: "Inicial", valor: data.fases_inicial },
    { nombre: "Desarrollo", valor: data.fases_desarrollo },
    { nombre: "Legalización", valor: data.fases_legalizacion },
    { nombre: "Final", valor: data.fases_final },
  ];
  const faseMasConcurrente = fases.reduce((max, curr) =>
    curr.valor > max.valor ? curr : max
  );

  return (
    <div>
      <div class="bg-[#658895] w-full h-[70px] rounded-t-xl">
        <h1 class="text-xl text-white text-center font-bold">
          Reporte de Fases
        </h1>
      </div>
      <div class="w-full h-full p-4">
        <div class="flex justify-center">
          <div class="w-[620px] h-[420px]">
            <canvas ref={chartRef} width={600} height={400}></canvas>
          </div>
        </div>
        <div class="mt-4 w-full">
          <div class="overflow-x-auto w-full flex justify-center align-middle items-center">
            <table class="w-[90%] text-sm border border-gray-200 rounded">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-2 py-1 border-b">Fase</th>
                  <th class="px-2 py-1 border-b">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {fases.map((f) => (
                  <tr key={f.nombre}>
                    <td class="px-2 py-1 border-b">{f.nombre}</td>
                    <td class="px-2 py-1 border-b text-center">{f.valor}</td>
                  </tr>
                ))}
                <tr class="bg-yellow-100 font-semibold">
                  <td class="px-2 py-1 border-b">Fase más concurrente</td>
                  <td class="px-2 py-1 border-b text-center">
                    {faseMasConcurrente.nombre} ({faseMasConcurrente.valor})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
