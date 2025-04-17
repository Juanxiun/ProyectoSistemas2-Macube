import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

//estructura
interface dataProps {
  idpro: number;
  fase: string;
  descripcion: string;
  fechafase: Date;
}

//registrar fase de proyecto
const proyFaNew = async (
  data: dataProps,
) => {
  try {
    await query.query(
      `INSERT INTO proy_fases (idpro, fase, fasedes, fechafase) VALUES (?, ?, ?, ?) `,
      [
        data.idpro,
        data.fase.toLowerCase(),
        data.descripcion.toLowerCase(),
        data.fechafase,
      ],
    );

    return "EXITO.";

  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};

//exportar
export { proyFaNew };