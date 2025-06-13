import { db } from "../../database/connect.ts";

const connect = await db();

export type typeDepartamento = {
  departamento: string;
  total_proyectos: number;
  construccion: number;
  inspecciones: number;
};

export const getReporteDepartamento = async (arqCodigo: string): Promise<typeDepartamento[]> => {
  try {
    const result = await (await connect).query(
      "CALL reportesDepartamento(?)",
      [arqCodigo],
    );
    if (Array.isArray(result) && result.length > 0) {
      return result as typeDepartamento[];
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};