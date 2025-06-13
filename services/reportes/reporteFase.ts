import { db } from "../../database/connect.ts";

const connect = await db();

export type typeFase = {
  arquitecto: string;
  fases_conflicto: number;
  fases_inicial: number;
  fases_desarrollo: number;
  fases_legalizacion: number;
  fases_final: number;
  total_fases: number;
  total_proyectos: number;
};

export const getReporteFase = async (arqCodigo: string): Promise<typeFase | null> => {
  try {
    const result = await (await connect).query(
      "CALL reportesFase(?)",
      [arqCodigo],
    );
    return result[0] ?? [0]
  } catch (error) {
    console.log(error);
    return null;
  }
};