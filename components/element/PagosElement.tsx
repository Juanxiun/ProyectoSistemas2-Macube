import { useState } from "preact/hooks";

interface pagosProps {
  pago: number;
  fecha: string;
}

interface ProgressBarProps {
  total: number;
  pagos: pagosProps[];
}

export default function PagosHechos({ total, pagos }: ProgressBarProps) {
  const totalPagado = pagos.reduce((acc, val) => acc + val.pago, 0);
  const porcentaje = Math.min((totalPagado / total) * 100, 100);

  // Calcular divisiones acumuladas
  const divisiones = pagos.reduce((acum: number[], pago) => {
    const ultimo = acum[acum.length - 1] ?? 0;
    acum.push(ultimo + (pago.pago / total) * 100);
    return acum;
  }, []);

  // Estado para mostrar el tooltip con la fecha
  const [tooltip, setTooltip] = useState<string | null>(null);

  // Función para manejar cuando el mouse pasa por encima de una división
  const handleMouseEnter = (idx: number) => {
    setTooltip(`Pago ${idx + 1}: Bs ${pagos[idx].pago} - Fecha: ${pagos[idx].fecha.toString()}`);
  };

  // Función para ocultar el tooltip cuando el mouse sale de la división
  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div class="w-full max-w-2xl py-8 mx-auto my-4">
      <h2 class="text-2xl font-semibold underline my-4 text-center">
        PAGOS REALIZADOS
      </h2>

      <div class="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          class="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 z-0"
          style={{ width: `${porcentaje}%` }}
        />

        {divisiones.map((pos, idx) => (
          <div
            key={idx}
            class="absolute top-0 h-full border-r-2 border-white z-10"
            style={{ left: `${pos}%` }}
            title={tooltip || ""}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      {/* Tooltip que muestra la fecha del pago */}
      {tooltip && (
        <div
          class="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-black text-white rounded shadow-lg"
          style={{ zIndex: 20 }}
        >
          {tooltip}
        </div>
      )}

      <div class="flex justify-between text-sm mt-2">
        <span>Total pagado: Bs {totalPagado.toFixed(2)}</span>
        <span>Restante: Bs {(total - totalPagado).toFixed(2)}</span>
      </div>
    </div>
  );
}
