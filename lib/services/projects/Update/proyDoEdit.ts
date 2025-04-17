import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

interface dataProps {
    idpro: number;
    nombredoc: string;
    tipodoc: string;
    archivo: string;
    descripcion: string;
}

//registrar proyectos
const proyDoEdit = async (data: dataProps) => {
  try {
    await query.query(
      `UPDATE proy_documentos  SET nombredoc=?, tipodoc=?, archivo=?, descripcion=? WHERE idpro=?`,
      [
        data.nombredoc,
        data.tipodoc,
        data.archivo,
        data.descripcion,
        data.idpro,
      ],
    );

    return "EXITO.";

  } catch (err) {
    console.error("Error - EDIT Proy:\n", err);
    throw new Error("Error - EDIT Proy.");
  }
};
export { proyDoEdit };
