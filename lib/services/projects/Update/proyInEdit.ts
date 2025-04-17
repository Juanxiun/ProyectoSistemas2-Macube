import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

interface dataProps {
    idpro: number;
    asunto: string;
    detalles: string;
    fechains: Date;
    estado: string;
}

//registrar proyectos
const proyInEdit = async (data: dataProps) => {
  try {
    await query.query(
      `UPDATE proy_inspecciones SET asunto=?, inspecciondes=?, fechains=?, estado=? WHERE idpro=?`,
      [
        data.asunto,
        data.detalles,
        data.fechains,
        data.estado,
        data.idpro,
      ],
    );

    return "EXITO.";

  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};

export {proyInEdit};