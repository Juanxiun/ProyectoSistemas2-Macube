import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

interface dataProps {
  idpro: number;
  fechapag: Date;
  monto: number;
  tipopago: string;
  detalles: string;
}

//registrar proyectos
const proyPaNew = async (data: dataProps) => {
  console.log(
    data.idpro,
    data.tipopago.toLowerCase(),
    data.monto,
    data.fechapag,
    data.detalles.toLowerCase(),
  )
  try {
    await query.query(
      `INSERT INTO proy_pagos (idpro, tipopago, monto, fechapag, pagodes) VALUES (?, ?, ?, ?, ?) `,
      [
        data.idpro,
        data.tipopago.toLowerCase(),
        data.monto,
        data.fechapag,
        data.detalles.toLowerCase(),
      ],
    );

    return "EXITO.";
  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};

export { proyPaNew };
