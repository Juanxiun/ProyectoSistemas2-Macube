import { db } from "../../database/connect.ts";

const connect = await db();

export const SearhProy = async (q: string) => {
  try {
    const result = await connect.query(
      `SELECT id, nomproy, depproy 
            FROM proyectos  
            WHERE 
                LOWER(nomproy) LIKE ? OR 
                UPPER(depproy) LIKE ? OR
                LOWER(tipproy) LIKE ? OR
                cli LIKE ?
            ORDER BY id DESC;`,
      [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`],
    );

    return result ?? [];
  } catch (error) {
    console.log(error);
    return `ERROR. ${error}`;
  }
};
