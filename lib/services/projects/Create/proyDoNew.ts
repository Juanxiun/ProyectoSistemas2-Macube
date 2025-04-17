import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

interface dataProps {
  idpro: number;
  nombredoc: string;
  tipodoc: string;
  publicado: Date;
  archivo: string;
  descripcion: string;
}

//registrar proyectos
const proyDoNew = async (data: dataProps) => {
  try {
    await query.query(
      `INSERT INTO proy_documentos (idpro, nombredoc, tipodoc, publicado, archivo, descripcion) VALUES (?, ?, ?, ?, ?, ?) `,
      [
        data.idpro,
        data.nombredoc,
        data.tipodoc,
        data.publicado,
        data.archivo,
        data.descripcion,
      ],
    );

    return "EXITO.";
  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};
export { proyDoNew };
