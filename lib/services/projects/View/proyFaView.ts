import { db } from "../../../database/connect.ts";

const query = await db();

const proyFaView = async (id: number) => {
  try {
    const result = await query.query(
      `SELECT 
        id, idpro, fase, fasedes, fechafase
      FROM 
        proy_fases 
      WHERE 
        idpro=?
      ORDER BY id DESC`,
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

export { proyFaView };
