import { useEffect, useRef, useState } from "preact/hooks";
import { typeSaldo } from "../../services/reportes/reporteSaldo.ts";

declare global {
  interface Window {
    Chart: any;
  }
}

export default function ReporteSaldo({ arq }: { arq: string }) {
  const [data, setData] = useState<typeSaldo[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/reportesApi?arq=${arq}&tipo=saldo`);
      const result = await res.json();
      setData(result.data ?? []);
    };
    fetchData();
  }, [arq]);

  useEffect(() => {
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
    if (!chartRef.current || !window.Chart || data.length === 0) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const labels = data.map((p) => p.nomproy);
    const values = data.map((p) => p.total_pagado);
    chartInstance.current = new window.Chart(chartRef.current, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: "Monto Pagado",
            data: values,
            backgroundColor: [
              "#658895",
              "#e4c36f",
              "#a7c7e7",
              "#f7cac9",
              "#92a8d1",
              "#f7786b",
              "#b5ead7",
              "#ffdac1",
              "#c7ceea",
            ],
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: "right",
            align: "center",
            labels: {
              boxWidth: 10,
              padding: 10,
              font: {
                size: 18,
              },
            },
          },
        },
        layout: {
          padding: {
            top: 0,
            bottom: 0,
          },
        },
      },
    });
  }

  if (!data.length) return <div>No hay datos de saldo.</div>;

  return (
    <div>
      <div class="bg-[#658895] w-full h-[70px] rounded-t-xl">
        <h2 class="text-xl text-white text-center font-bold">
          Saldo de Proyectos
        </h2>
      </div>
      <div class="w-full h-full p-4">
        <div class="flex justify-start align-top items-start mb-2">
          <div class="flex flex-row items-center">
            <div class="w-full h-[40%]">
              <canvas ref={chartRef} width={620} height={420}></canvas>
            </div>
          </div>
        </div>
        <div class="w-full mt-2">
          <div class="overflow-x-auto w-full flex justify-center align-middle items-center">
            <table class="w-[70%] text-sm border border-gray-200 rounded">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-2 py-1 border-b">Proyecto</th>
                  <th class="px-2 py-1 border-b">Porcentaje pagado</th>
                </tr>
              </thead>
              <tbody>
                {data.map((p) => {
                  const porcentaje = p.precio_proyecto
                    ? ((p.total_pagado / p.precio_proyecto) * 100).toFixed(2)
                    : "0.00";
                  return (
                    <tr key={p.id}>
                      <td class="px-2 py-1 border-b">{p.nomproy}</td>
                      <td class="px-2 py-1 border-b text-center">
                        {porcentaje}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
