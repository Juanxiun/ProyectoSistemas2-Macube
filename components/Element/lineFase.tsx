import { useEffect, useState } from "preact/hooks/";
import { formatTime } from "../../lib/utils/timeFormat.ts";

interface FaseProps {
  id?: string;
  proy?: string;
  nomfas?: string;
  fecfas?: string;
  tipfas?: string;
}

interface lineProp {
  fasep: FaseProps[];
  onclick?: (fase: FaseProps) => void;
}

export function LineFase({ fasep, onclick }: lineProp) {
  const [canFas, setCanFas] = useState(0);
  const [hoveredFase, setHoveredFase] = useState<FaseProps | null>(null);

  useEffect(() => {
    if (fasep && fasep.length > 0) {
      const ultimaFase = fasep[fasep.length - 1];
      const numFas = ultimaFase?.tipfas ? faseActual(ultimaFase.tipfas) : 0;
      setCanFas(numFas);
    }
  }, [fasep]);

  const fasesOrdenadas = [
    { nombre: "Inicial", tipo: "inicial", completada: canFas >= 1 },
    { nombre: "Desarrollo", tipo: "desarrollo", completada: canFas >= 2 },
    { nombre: "Legal", tipo: "legal", completada: canFas >= 3 },
    { nombre: "Finalización", tipo: "fin", completada: canFas >= 4 },
  ];

  const faseActualIndex = Math.min(canFas - 1, 3);

  return (
    <div class="w-full flex flex-col items-center px-4">
      <div class="w-full max-w-3xl flex flex-row items-center justify-between relative mb-8">
        <div class="absolute h-4 w-full bg-gray-200 rounded-full z-0"></div>
        <div
          class="absolute h-4 bg-[#e4c36f] rounded-full z-10 transition-all duration-500 ease-out"
          style={{
            width: `${(faseActualIndex + 1) * 25}%`,
            display: canFas === 0 ? "none" : "block",
          }}
        >
        </div>

        {fasesOrdenadas.map((fase, index) => {
          const isCompleted = index < faseActualIndex;
          const isCurrent = index === faseActualIndex && canFas > 0;
          const isConflict = canFas === 0 && fase.tipo === "inicial";
          const isFuture = index > faseActualIndex;

          let bgColor = "#e0e0e0";
          let textColor = "text-gray-500";
          let borderColor = "border-gray-300";

          if (isCompleted) {
            bgColor = "#e4c36f";
            textColor = "text-[#e4c36f]";
            borderColor = "border-[#e4c36f]";
          }
          if (isCurrent) {
            bgColor = "#e4c36f";
            textColor = "text-[#e4c36f] font-bold";
            borderColor = "border-[#e4c36f]";
          }
          if (isConflict) {
            bgColor = "#393a44";
            textColor = "text-[#393a44] font-bold";
            borderColor = "border-[#393a44]";
          }

          const faseData = fasep.find((f) => f.tipfas === fase.tipo) ||
            fasep[0];

          return (
            <div
              key={fase.tipo}
              class="relative z-20 flex flex-col items-center group"
              onMouseEnter={() => setHoveredFase(faseData)}
              onMouseLeave={() => setHoveredFase(null)}
              onClick={() => onclick && onclick(faseData)}
            >
              <div
                class={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center transition-all duration-300 ${
                  onclick ? "cursor-pointer hover:scale-110" : ""
                }`}
                style={{ backgroundColor: bgColor }}
              >
                {isCompleted && (
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    >
                    </path>
                  </svg>
                )}
                {isConflict && (
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M6 18L18 6M6 6l12 12"
                    >
                    </path>
                  </svg>
                )}
              </div>

              <div class={`mt-3 text-sm font-medium text-center ${textColor}`}>
                {fase.nombre}
              </div>
            </div>
          );
        })}
      </div>

      {hoveredFase && (
        <div class="bg-white absolute top-0 p-5 rounded-lg shadow-xl border border-gray-200 max-w-xs transform transition-all duration-300 animate-fadeIn">
          <h3 class="font-bold text-lg mb-2 text-gray-800">
            {hoveredFase.nomfas}
          </h3>
          <div class="space-y-2">
            <div class="flex items-start">
              <span class="font-semibold text-gray-600 w-20">Fecha:</span>
              <span class="text-gray-800 flex-1">
                {hoveredFase.fecfas ? formatTime(hoveredFase.fecfas) : "N/A"}
              </span>
            </div>
            <div class="flex items-start">
              <span class="font-semibold text-gray-600 w-20">Estado:</span>
              <span class="text-gray-800 flex-1 capitalize">
                {hoveredFase.tipfas || "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const faseActual = (fase: string) => {
  switch (fase.toLowerCase()) {
    case "inicial":
      return 1;
    case "desarrollo":
      return 2;
    case "legal":
      return 3;
    case "fin":
      return 4;
    case "conflicto":
      return 0;
    default:
      return 0;
  }
};
