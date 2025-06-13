import { getReporteSaldo, typeSaldo } from "./reporteSaldo.ts";
import { getReporteDepartamento, typeDepartamento } from "./reporteDep.ts";
import { getReporteFase, typeFase } from "./reporteFase.ts";
import { getReporteTipo, typeProyectoTipo } from "./reporteTipo.ts";
import { PDFDocument, rgb, StandardFonts } from "https://esm.sh/pdf-lib@1.17.1";

function drawTableHeader(page: any, y: number, headers: string[], widths: number[], font: any) {
  let x = 50;
  page.drawLine({ start: { x, y: y + 2 }, end: { x: x + widths.reduce((a, b) => a + b), y: y + 2 }, thickness: 1, color: rgb(0.2, 0.3, 0.4) });
  for (let i = 0; i < headers.length; i++) {
    page.drawText(headers[i], { x, y, size: 10, font, color: rgb(0.2, 0.3, 0.4) });
    x += widths[i];
  }
  y -= 13;
  x = 50;
  page.drawLine({ start: { x, y: y + 10 }, end: { x: x + widths.reduce((a, b) => a + b), y: y + 10 }, thickness: 1, color: rgb(0.2, 0.3, 0.4) });
  return y;
}

function drawTableRow(page: any, y: number, values: string[], widths: number[], font: any) {
  let x = 50;
  for (let i = 0; i < values.length; i++) {
    page.drawText(values[i], { x, y, size: 10, font });
    x += widths[i];
  }
  return y - 13;
}

export async function generarReportePDF(arq: string, nombre: string) {
  const saldoArr: typeSaldo[] = (await getReporteSaldo(arq)) ?? [];
  const departamentosArr: typeDepartamento[] = (await getReporteDepartamento(arq)) ?? [];

  let fase: typeFase = (await getReporteFase(arq)) as typeFase;
  if (!fase || Array.isArray(fase)) fase = {
    arquitecto: "",
    fases_conflicto: 0,
    fases_inicial: 0,
    fases_desarrollo: 0,
    fases_legalizacion: 0,
    fases_final: 0,
    total_fases: 0,
    total_proyectos: 0,
  };

  let tipo: typeProyectoTipo = (await getReporteTipo(arq)) as typeProyectoTipo;
  if (!tipo || Array.isArray(tipo)) tipo = {
    arquitecto: "",
    proyectos: 0,
    construccion: 0,
    inspeccion: 0,
    total_precio_proy: 0,
    total_precio_insp: 0,
  };

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let page = pdfDoc.addPage([595, 842]);
  let y = 800;

  // Título principal
  page.drawText(`REPORTES DE PROYECTO`, {
    x: 50,
    y,
    size: 22,
    font,
    color: rgb(0.2, 0.3, 0.4),
  });
  y -= 30;
  page.drawText(`Arquitecto: ${nombre} (${arq})`, {
    x: 50,
    y,
    size: 14,
    font,
    color: rgb(0.2, 0.3, 0.4),
  });

  // Tabla de Saldo
  y -= 40;
  page.drawText("Saldo de Proyectos:", { x: 50, y, size: 16, font, color: rgb(0.2, 0.3, 0.4) });
  y -= 20;
  y = drawTableHeader(page, y, ["Proyecto", "Precio", "Pagado", "Pendiente"], [170, 80, 80, 80], font);
  for (const s of saldoArr) {
    y = drawTableRow(
      page,
      y,
      [
        (s.nomproy || "").slice(0, 25),
        (s.precio_proyecto ?? 0).toFixed(2),
        (s.total_pagado ?? 0).toFixed(2),
        (s.saldo_pendiente ?? 0).toFixed(2),
      ],
      [170, 80, 80, 80],
      font
    );
    if (y < 60) {
      y = 800;
      page = pdfDoc.addPage([595, 842]);
    }
  }

  // Tabla de Departamentos
  y -= 25;
  page.drawText("Proyectos por Departamento:", { x: 50, y, size: 16, font, color: rgb(0.2, 0.3, 0.4) });
  y -= 20;
  y = drawTableHeader(page, y, ["Departamento", "Total", "Construcción", "Inspecciones"], [120, 60, 100, 100], font);
  for (const d of departamentosArr) {
    y = drawTableRow(
      page,
      y,
      [
        (d.departamento || "").slice(0, 18),
        (d.total_proyectos ?? 0).toString(),
        (d.construccion ?? 0).toString(),
        (d.inspecciones ?? 0).toString(),
      ],
      [120, 60, 100, 100],
      font
    );
    if (y < 60) {
      y = 800;
      page = pdfDoc.addPage([595, 842]);
    }
  }

  // Tabla de Fases
  y -= 25;
  page.drawText("Fases de Proyectos:", { x: 50, y, size: 16, font, color: rgb(0.2, 0.3, 0.4) });
  y -= 20;
  y = drawTableHeader(page, y, ["Conflicto", "Inicial", "Desarrollo", "Legalización", "Final"], [60, 60, 80, 90, 60], font);
  y = drawTableRow(
    page,
    y,
    [
      (fase.fases_conflicto ?? 0).toString(),
      (fase.fases_inicial ?? 0).toString(),
      (fase.fases_desarrollo ?? 0).toString(),
      (fase.fases_legalizacion ?? 0).toString(),
      (fase.fases_final ?? 0).toString(),
    ],
    [60, 60, 80, 90, 60],
    font
  );
  y -= 10;
  page.drawText(
    `Total Fases: ${(fase.total_fases ?? 0)} | Total Proyectos: ${(fase.total_proyectos ?? 0)}`,
    { x: 50, y, size: 10, font }
  );

  // Tabla de Tipos
  y -= 25;
  page.drawText("Tipos de Proyectos:", { x: 50, y, size: 16, font, color: rgb(0.2, 0.3, 0.4) });
  y -= 20;
  y = drawTableHeader(page, y, ["Tipo", "Cantidad", "Monto Total (Bs.)"], [120, 80, 120], font);
  y = drawTableRow(
    page,
    y,
    [
      "Construcción",
      (tipo.construccion ?? 0).toString(),
      (tipo.total_precio_proy ?? 0).toFixed(2),
    ],
    [120, 80, 120],
    font
  );
  y = drawTableRow(
    page,
    y,
    [
      "Inspección",
      (tipo.inspeccion ?? 0).toString(),
      (tipo.total_precio_insp ?? 0).toFixed(2),
    ],
    [120, 80, 120],
    font
  );
  y -= 10;
  page.drawText(
    `Total Proyectos: ${(tipo.proyectos ?? 0)} | Arquitecto: ${(tipo.arquitecto ?? "")}`,
    { x: 50, y, size: 10, font }
  );

  // Retornar el PDF como base64
  const pdfBytes = await pdfDoc.save();
  const base64 = "data:application/pdf;base64," +
    btoa(String.fromCharCode(...pdfBytes));
  return base64;
}