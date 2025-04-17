import { db } from "../../../database/connect.ts";

const query = await db();

const proyPaView = async (id: number) => {
  try {
    const result = await query.query(
      `SELECT 
        id, idpro, tipopago, monto, fechapag, pagodes 
      FROM 
        proy_pagos 
      WHERE 
        idpro=?`,
      [id],
    );

    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};

export { proyPaView };
