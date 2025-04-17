import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

//estructura
interface dataProps {
  idpro: number;
  fase: string;
  descripcion: string;
}

//registrar fase de proyecto
const proyFaEdit = async (
  data: dataProps,
) => {
  try {
    await query.query(
      `UPDATE proy_fases SET fase=?, descripcion=? WHERE idpro=?`,
      [
        data.fase.toLowerCase(),
        data.descripcion.toLowerCase(),
        data.idpro,
      ],
    );
  } catch (err) {
    console.error("Error - EDIT Proy:\n", err);
    throw new Error("Error - EDIT Proy.");
  }
};

//exportar
export { proyFaEdit };