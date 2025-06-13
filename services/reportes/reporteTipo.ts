import { db } from "../../database/connect.ts";

const connect = await db();

export type typeProyectoTipo = {
  arquitecto: string;
  proyectos: number;
  construccion: number;
  inspeccion: number;
  total_precio_proy: number;
  total_precio_insp: number;
};

export const getReporteTipo = async (arqCodigo: string): Promise<typeProyectoTipo | null>  => {
  try {
    const result = await (await connect).query(
      "CALL reportesTipo(?)",
      [arqCodigo],
    );
    
    return result[0] ?? [0]

  } catch (error) {
    console.log(error);
    return null
  }
};