import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

interface dataProps {
    idpro: number;
    monto: number;
    tipopago: string;
    detalles: string;
}

//registrar proyectos
const proyPaEdit = async (data: dataProps) => {
  try {
    await query.query(
      `UPDATE proy_pagos SET monto=?, tipopago=?, pagodes=? WHERE idpro =?`,
      [
        data.monto,
        data.tipopago.toLowerCase(),
        data.detalles.toLowerCase(),
        data.idpro,
      ],
    );

    return "EXITO.";

  } catch (err) {
    console.error("Error - EDIT Proy:\n", err);
    throw new Error("Error - EDIT Proy.");
  }
};

export { proyPaEdit }