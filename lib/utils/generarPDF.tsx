import { getReporteSaldo } from "../../services/reportes/reporteSaldo.ts";
import { getReporteDepartamento } from "../../services/reportes/reporteDep.ts";
import { getReporteFase } from "../../services/reportes/reporteFase.ts";
import { getReporteTipo } from "../../services/reportes/reporteTipo.ts";

// Importa pdf-lib desde un CDN compatible con Deno
import { PDFDocument, rgb, StandardFonts } from "https://esm.sh/pdf-lib@1.17.1";

type FaseReporte = {
  fases_conflicto?: number;
  fases_inicial?: number;
  fases_desarrollo?: number;
  fases_legalizacion?: number;
  fases_final?: number;
  total_fases?: number;
  total_proyectos?: number;
};

export async function generarReporteCompletoPDF(arq: string, nombre: string) {
  // 1. Obtener los datos de los reportes
  const saldo = await getReporteSaldo(arq) ?? [];
  const departamentos = await getReporteDepartamento(arq) ?? [];
  const fase: FaseReporte = await getReporteFase(arq) ?? {};
  type TipoReporte = {
    construccion?: number;
    inspeccion?: number;
    total_precio_proy?: number;
    total_precio_insp?: number;
    proyectos?: number;
    arquitecto?: string;
  };
  
  const tipo: TipoReporte = await getReporteTipo(arq) ?? {};

  // 2. Crear el PDF
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let page = pdfDoc.addPage([595, 842]); // A4 vertical
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
  page.drawText("Saldo de Proyectos:", { x: 50, y, size: 16, font });
  y -= 20;
  page.drawText("Proyecto                | Precio    | Pagado   | Pendiente", {
    x: 50,
    y,
    size: 10,
    font,
  });
  y -= 15;
  for (const s of saldo) {
    page.drawText(
      `${(s.nomproy || "").slice(0, 20).padEnd(22)}| ${(s.precio_proyecto ?? 0).toFixed(2).padStart(8)} | ${(s.total_pagado ?? 0).toFixed(2).padStart(8)} | ${(s.saldo_pendiente ?? 0).toFixed(2).padStart(8)}`,
      { x: 50, y, size: 10, font }
    );
    y -= 13;
    if (y < 60) {
      y = 800;
      page = pdfDoc.addPage([595, 842]);
    }
  }

  // Tabla de Departamentos
  y -= 25;
  page.drawText("Proyectos por Departamento:", { x: 50, y, size: 16, font });
  y -= 20;
  page.drawText("Departamento        | Total | Construcción | Inspecciones", {
    x: 50,
    y,
    size: 10,
    font,
  });
  y -= 15;
  for (const d of departamentos) {
    page.drawText(
      `${(d.departamento || "").slice(0, 18).padEnd(20)}| ${(d.total_proyectos ?? 0).toString().padStart(5)} | ${(d.construccion ?? 0).toString().padStart(12)} | ${(d.inspecciones ?? 0).toString().padStart(12)}`,
      { x: 50, y, size: 10, font }
    );
    y -= 13;
    if (y < 60) {
      y = 800;
      page = pdfDoc.addPage([595, 842]);
    }
  }

  // Tabla de Fases
  y -= 25;
  page.drawText("Fases de Proyectos:", { x: 50, y, size: 16, font });
  y -= 20;
  if (fase) {
    page.drawText(
      `Conflicto: ${(fase.fases_conflicto ?? 0)} | Inicial: ${(fase.fases_inicial ?? 0)} | Desarrollo: ${(fase.fases_desarrollo ?? 0)} | Legalización: ${(fase.fases_legalizacion ?? 0)} | Final: ${(fase.fases_final ?? 0)}`,
      { x: 50, y, size: 10, font }
    );
    y -= 15;
    page.drawText(
      `Total Fases: ${(fase.total_fases ?? 0)} | Total Proyectos: ${(fase.total_proyectos ?? 0)}`,
      { x: 50, y, size: 10, font }
    );
    y -= 13;
  }

  // Tabla de Tipos
  y -= 25;
  page.drawText("Tipos de Proyectos:", { x: 50, y, size: 16, font });
  y -= 20;
  if (tipo) {
    page.drawText(
      `Construcción: ${(tipo.construccion ?? 0)} (Bs. ${(tipo.total_precio_proy ?? 0).toFixed(2)}) | Inspección: ${(tipo.inspeccion ?? 0)} (Bs. ${(tipo.total_precio_insp ?? 0).toFixed(2)})`,
      { x: 50, y, size: 10, font }
    );
    y -= 13;
    page.drawText(
      `Total Proyectos: ${(tipo.proyectos ?? 0)} | Arquitecto: ${(tipo.arquitecto ?? "")}`,
      { x: 50, y, size: 10, font }
    );
    y -= 13;
  }

  // 3. Retornar el PDF como base64
  const pdfBytes = await pdfDoc.save();
  const base64 = "data:application/pdf;base64," +
    btoa(String.fromCharCode(...pdfBytes));
  return base64;
}