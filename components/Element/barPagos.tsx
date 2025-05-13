import { useState } from "preact/hooks";

interface PagoProps {
  id?: string;
  proy?: string;
  nompag?: string;
  fecpag?: string;
  tippag?: string;
  despag?: string;
  monpag?: number;
}

interface barProp {
  pagop: PagoProps[];
  precioTotal: number;
  onclick?: (pago: PagoProps) => void;
}

export function BarPagos({ pagop, precioTotal, onclick }: barProp) {
  const [hoveredPago, setHoveredPago] = useState<PagoProps | null>(null);
  const [selectedPago, setSelectedPago] = useState<PagoProps | null>(null);

  // Calcular el monto total pagado
  const totalPagado = pagop.reduce((sum, pago) => sum + (pago.monpag || 0), 0);

  // Calcular posiciones de los pagos en la barra
  let acumulado = 0;
  const segmentos = pagop.map((pago) => {
    const inicio = (acumulado / precioTotal) * 100;
    const ancho = ((pago.monpag || 0) / precioTotal) * 100;
    acumulado += pago.monpag || 0;
    return {
      ...pago,
      inicio,
      ancho,
    };
  });

  return (
    <div class="w-full">
      {/* Barra de progreso */}
      <div class="w-full h-8 bg-[#c7c7c7] rounded-full relative overflow-hidden flex">
        {segmentos.map((pago, idx) => {
          // Color del segmento
          let bg = "#e4c36f";
          if (selectedPago?.id === pago.id) bg = "#658895";
          else if (pago.inicio >= (totalPagado / precioTotal) * 100) bg = "#c7c7c7";

          return (
            <div
              key={pago.id}
              class="h-full cursor-pointer transition-all relative"
              style={{
                width: `${pago.ancho}%`,
                backgroundColor: bg,
                zIndex: selectedPago?.id === pago.id ? 20 : 10,
                borderTopLeftRadius: idx === 0 ? "9999px" : "0",
                borderBottomLeftRadius: idx === 0 ? "9999px" : "0",
                borderTopRightRadius: idx === segmentos.length - 1 ? "9999px" : "0",
                borderBottomRightRadius: idx === segmentos.length - 1 ? "9999px" : "0",
                marginRight: idx !== segmentos.length - 1 ? "2px" : "0", // Separación visual
                border: "2px solid #fff", // Borde blanco para distinguir
                boxSizing: "border-box",
              }}
              onMouseEnter={() => setHoveredPago(pago)}
              onMouseLeave={() => setHoveredPago(null)}
              onClick={() => {
                setSelectedPago(pago);
                onclick && onclick(pago);
              }}
            ></div>
          );
        })}
        <div
          class="absolute right-0 top-0 h-full flex items-center pr-2 text-xl font-bold text-[#393a44]"
          style={{ zIndex: 30 }}
        >
          Bs. {precioTotal}
        </div>
      </div>

      {hoveredPago && (
        <div class="mt-2 p-2 bg-[#658895] absolute text-white rounded text-sm">
          <div><b>{hoveredPago.nompag}</b></div>
          <div>{hoveredPago.despag}</div>
          <div>Monto: ${hoveredPago.monpag}</div>
          <div>Fecha: {hoveredPago.fecpag}</div>
        </div>
      )}

    </div>
  );
}