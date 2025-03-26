import { db } from "../../lib/database/connect.ts";
import DataUser from "../../lib/database/models/DataUser.ts";


export async function Middleware(codigo: number): Promise<DataUser[]> {
  try {

    const result = await db.queryObject(
      "SELECT ci, nombres, apellidos FROM clientes WHERE ci = $1 ",
      [codigo],
    );
    if (result) {
      // deno-lint-ignore no-explicit-any
      const datox: DataUser[] = result.rows.map((row: any) => ({
        codigo: row.ci,
        nombres: row.nombres,
        apellidos: row.apellidos,
        rol: 'cli',
      }));

      return datox;
    } else {
      const result = await db.queryObject(
        "SELECT codigo, nombres, apellidos FROM arquitectos WHERE codigo = $1 ",
        [codigo],
      );

      if (result) {
        // deno-lint-ignore no-explicit-any
        const datox: DataUser[] = result.rows.map((row: any) => ({
          codigo: row.codigo,
          nombres: row.nombres,
          apellidos: row.apellidos,
          rol: 'arq',
        }));

        return datox;

      } else {
        const datox: DataUser[] = [];

        return datox;
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
