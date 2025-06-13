import { useMemo } from "preact/hooks";

interface InspeccionProps {
  id?: string;
  proy?: string;
  tipins?: string;
  desins?: string;
  fecins?: string;
  estins?: string;
}

interface contiProp {
  inp: InspeccionProps[];
}

// Horas de 9am a 6pm
const horas = Array.from({ length: 10 }, (_, i) => 9 + i); // 9 a 18

// Días de la semana (lunes a viernes)
const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

function esMismaFecha(fecha1: Date, fecha2: Date) {
  return (
    fecha1.getFullYear() === fecha2.getFullYear() &&
    fecha1.getMonth() === fecha2.getMonth() &&
    fecha1.getDate() === fecha2.getDate()
  );
}

function horaLabel(hora: number) {
  if (hora === 12) return "12pm";
  if (hora === 0) return "12am";
  if (hora > 12) return `${hora - 12}pm`;
  return `${hora}am`;
}

export function ContInsp({ inp }: contiProp) {
  // Obtener todas las fechas de inspección y convertirlas a Date
  const inspecciones = useMemo(
    () =>
      inp
        .filter((i) => i.fecins)
        .map((i) => ({
          ...i,
          fecha: new Date(i.fecins as string),
        })),
    [inp],
  );

  // Obtener la semana actual (lunes a viernes)
  const hoy = new Date();
  const diaSemana = hoy.getDay() === 0 ? 7 : hoy.getDay(); // 1=lunes, 7=domingo
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - (diaSemana - 1));
  const semana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(lunes);
    d.setDate(lunes.getDate() + i);
    return d;
  });

  // Agrupar inspecciones por día
  const inspeccionesPorDia: Record<
    number,
    { hora: number; insp: InspeccionProps }[]
  > = {};
  semana.forEach((dia, idx) => {
    inspeccionesPorDia[idx] = [];
    horas.forEach((hora) => {
      const insp = inspecciones.find(
        (i) =>
          esMismaFecha(i.fecha, dia) &&
          new Date(i.fecins as string).getHours() === hora,
      );
      if (insp) {
        inspeccionesPorDia[idx].push({ hora, insp });
      }
    });
  });

  return (
    <div className="w-full p-4">
      <div className="mt-3 text-lg text-gray-500 flex gap-4">
        <span className="inline-block w-4 h-4 align-middle mr-1 bg-[#e4c36f] border border-[#bfa14e]">
        </span>
        Hoy
        <span className="inline-block w-4 h-4 align-middle mx-2 bg-[#658895] border border-[#3d5c6b]">
        </span>
        Próxima inspección
        <span className="inline-block w-4 h-4 align-middle mx-2 bg-gray-200 border border-gray-300">
        </span>
        Pasada
      </div>
      <div className="flex flex-row gap-4 justify-between   ">
        {semana.map((dia, idx) => (
          <div
            key={idx}
            className="flex-1 bg-white rounded-lg shadow border border-gray-200 px-2 py-2 flex flex-col"
            style={{ minWidth: "170px" }}
          >
            <div className="mb-2">
              <div className="font-semibold text-[#658895] text-xl text-center">
                {diasSemana[idx]}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {horas.map((hora) => {
                const insp = inspecciones.find(
                  (i) =>
                    esMismaFecha(i.fecha, dia) &&
                    new Date(i.fecins as string).getHours() === hora,
                );
                let bg = "bg-gray-50";
                let border = "";
                let text = "text-gray-400";
                if (insp) {
                  if (esMismaFecha(dia, hoy)) {
                    bg = "bg-[#e4c36f]";
                    border = "border-[#bfa14e]";
                    text = "text-[#393a44]";
                  } else if (dia > hoy) {
                    bg = "bg-[#658895]";
                    border = "border-[#3d5c6b]";
                    text = "text-white";
                  } else {
                    bg = "bg-gray-200";
                    border = "border-gray-300";
                    text = "text-gray-600";
                  }
                }
                return (
                  <div
                    key={hora}
                    className={`rounded flex flex-row items-center px-2 py-1 border ${border} ${bg} ${text} transition-all duration-200`}
                    style={{
                      minHeight: "2.2rem",
                      marginBottom: "2px",
                      fontSize: "0.95rem",
                    }}
                  >
                    <span className="w-10 font-mono text-xs">
                      {horaLabel(hora)}
                    </span>
                    {insp
                      ? (
                        <div className="flex-1 pl-2">
                          <span className="font-bold text-xs">
                            {insp.tipins}
                          </span>
                          <div className="text-lg">{insp.desins}</div>
                          <div className="text-xs text-gray-500">
                            {insp.fecins
                              ? new Date(insp.fecins).toLocaleString("es-BO", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                              : ""}
                          </div>
                        </div>
                      )
                      : <span className="flex-1 text-center text-xs">-</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
