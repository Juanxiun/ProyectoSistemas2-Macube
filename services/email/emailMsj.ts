import { db } from "../../database/connect.ts";
import { messageEmail } from "./enviarEmail.ts";
import { generarHTMLmsj } from "./page/msj.page.ts";

const connect = await db();

export const EmailMsj = async (
  { codigo, correo, nombre, asunto, contenido }: msjProps,
) => {
  try {
    const pagRes = generarHTMLmsj({
      nombre: nombre,
      tipo: asunto,
      mensaje: contenido,
    });

    const emailRes = await messageEmail({
      para: correo ?? "",
      nombre: nombre,
      titulo: asunto,
      contenido: pagRes,
    });

    if (emailRes !== "OK") return emailRes;
    const registroE = await RegEmail({
      codigo: codigo,
      correo: correo,
      nombre: nombre,
      asunto: asunto,
      contenido: contenido,
    });

    if (registroE !== "OK") return registroE;
    return "OK";
  } catch (e) {
    console.log(e);
    return `ERROR ${e}`;
  }
};

export const telelMsj = async (
  { codigo, telefono, nombre, asunto, contenido }: msjProps,
) => {
  try {

    //aun falta la api de whatsapp


    const registroE = await RegTelefono({
      codigo: codigo,
      telefono: telefono,
      nombre: nombre,
      asunto: asunto,
      contenido: contenido,
    });

    if (registroE !== "OK") return registroE;
    return "OK";
  } catch (e) {
    console.log(e);
    return `ERROR ${e}`;
  }
};

//metodos -para mandar mensajes
const RegEmail = async (
  { codigo, correo, nombre, asunto, contenido }: msjProps,
) => {
  try {
    await connect.query("CALL msj_cor(?, ?, ?, ?, ?)", [
      codigo,
      correo,
      nombre,
      asunto,
      contenido,
    ]);

    return "OK";
  } catch (e) {
    console.log(e);
    return `ERROR ${e}`;
  }
};

const RegTelefono = async (
  { codigo, telefono, nombre, asunto, contenido }: msjProps,
) => {
  try {
    await connect.query("CALL msj_tel(?, ?, ?, ?, ?)", [
      codigo,
      telefono,
      nombre,
      asunto,
      contenido,
    ]);

    return "OK";
  } catch (e) {
    console.log(e);
    return `ERROR ${e}`;
  }
};

interface msjProps {
  codigo: string;
  correo?: string;
  telefono?: string;
  nombre: string;
  asunto: string;
  contenido: string;
}
