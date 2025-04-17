interface proyProps {
    id?: number;
    idpro?: number;
    fase: string;
    descripcion?: string;
    fechafase?: Date;
  }
  
  export function FaseElement({ fase }: proyProps) {
    const fases = ["fase0", "fase1", "fase2", "fase3", "fase4"];
    const etiquetas = [
      "Fase conflicto",
      "Fase inicial",
      "Fase desarrollo",
      "Fase inspección",
      "Fase final",
    ];
    const faseIndex = fases.indexOf(fase);
  
    return (
      <div class="flex justify-between items-center w-full max-w-4xl mx-auto mt-10 px-4">
        {fases.map((f, index) => (
          <div key={f} class="flex-1 flex flex-col items-center relative">
            {/* Punto de progreso */}
            <div
              onMouseEnter={() => {
                // evento vacío por ahora
              }}
              class={`flex items-center justify-center w-10 h-10 rounded-full text-white text-sm mb-2 transition-colors duration-300 shadow-md
                ${index <= faseIndex ? "bg-green-500" : "bg-gray-300"}
              `}
            >
              ✓
            </div>
  
            {/* Línea de conexión */}
            {index < fases.length - 1 && (
              <div
                class={`absolute top-5 left-1/2 w-full h-1 transform -translate-y-1/2 z-[-1]
                  ${index < faseIndex ? "bg-green-500" : "bg-gray-300"}
              `}
              ></div>
            )}
  
            {/* Nombre de la fase */}
            <span class="text-xs text-center whitespace-nowrap">
              {etiquetas[index]}
            </span>
          </div>
        ))}
      </div>
    );
  }
  