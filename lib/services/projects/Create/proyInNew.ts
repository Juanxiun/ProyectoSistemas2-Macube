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
const proyInNew = async (data: dataProps) => {
  try {
    await query.query(
      `INSERT INTO proy_inspecciones (idpro, asunto, inspecciondes, fechains, estado) VALUES (?, ?, ?, ?, ?) `,
      [
        data.idpro,
        data.asunto,
        data.detalles,
        data.fechains,
        data.estado
      ],
    );

    return "EXITO.";

  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};

export {proyInNew};