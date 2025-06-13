import { db } from "../../database/connect.ts";
import { typeContactos } from "../../type/typeUsuarios.ts";

const connect = await db();

export const ContactosCall = async (idusr: string) => {
  try {
    const result = await connect.query("CALL listarContacto(?)", [idusr]);
    return result as typeContactos[] ?? [];
  } catch (e) {
    console.log(e);
  }
};
