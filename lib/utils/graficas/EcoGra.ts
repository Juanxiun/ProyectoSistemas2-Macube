export function graficaPastelAvance(
  totalFases: number,
  fasesCompletadas: string[],
  faseActual: string
): string {
  // Cálculo de cantidades
  const completadas = fasesCompletadas.length;
  const actual = 1;
  const pendientes = Math.max(totalFases - completadas - actual, 0);

  // Cálculo de ángulos
  const total = completadas + actual + pendientes;
  const angCompletadas = (completadas / total) * 360;
  const angActual = (actual / total) * 360;
  const angPendientes = (pendientes / total) * 360;

  // Utilidad para arco SVG
  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", cx, cy,
      "L", start.x, start.y,
      "A", r, r, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  }

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + (r * Math.cos(rad)),
      y: cy + (r * Math.sin(rad))
    };
  }

  // Parámetros SVG
  const cx = 75, cy = 75, r = 60;
  let start = 0;
  const arcoCompletadas = describeArc(cx, cy, r, start, start + angCompletadas);
  start += angCompletadas;
  const arcoActual = describeArc(cx, cy, r, start, start + angActual);
  start += angActual;
  const arcoPendientes = describeArc(cx, cy, r, start, start + angPendientes);

  // SVG Pie Chart
  return `
    <svg width="150" height="150" viewBox="0 0 150 150">
      <!-- Fases completadas -->
      <path d="${arcoCompletadas}" fill="#658895"/>
      <!-- Fase actual -->
      <path d="${arcoActual}" fill="#e4c36f"/>
      <!-- Fases pendientes -->
      <path d="${arcoPendientes}" fill="#e5e7eb"/>
      <!-- Texto central -->
      <text x="${cx}" y="${cy}" text-anchor="middle" dy="0.3em" font-size="1.7em" fill="#393a44" font-weight="bold">
        ${completadas + 1} / ${totalFases}
      </text>
      <!-- Leyenda -->
      <g font-size="0.9em">
        <rect x="10" y="130" width="12" height="12" fill="#658895"/>
        <text x="27" y="140" fill="#393a44">Completadas (${completadas})</text>
        <rect x="90" y="130" width="12" height="12" fill="#e4c36f"/>
        <text x="107" y="140" fill="#393a44">Actual (${faseActual})</text>
      </g>
    </svg>
  `;
}