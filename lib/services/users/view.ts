import { db } from "../../database/connect.ts";

const query = await db();

const viewCli = async () => {
  try {
    const result = await query.query(
      `SELECT ci, nombres, apellidos FROM clientes WHERE habilitado = 1`,
    );

    if (result) return result;
    else return "";
    
  } catch (err) {
    console.error("Error CLIENTES view:\n", err);
    throw new Error("Error. CLIENTES.");
  }
};

const viewArq = async () => {
  try {
    const result = await query.query(
      `SELECT codigo, nombres, apellidos FROM arquitectos WHERE habilitado = 1`,
    );

    if (result) return result;
    else return "";

  } catch (err) {
    console.error("Error ARQUITECTOS view:\n", err);
    throw new Error("Error. ARQUITECTOS.");
  }
};

export { viewArq, viewCli };
