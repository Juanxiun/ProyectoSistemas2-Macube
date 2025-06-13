import { apiInst, sendEMTP } from "./emailConnect.ts";

export async function messageEmail(
  { para, nombre, titulo, contenido }: EmtpProp,
) {
  try {
    sendEMTP.subject = titulo;
    sendEMTP.to = [{ email: para, name: nombre }];
    sendEMTP.htmlContent = contenido;
    sendEMTP.sender = {
      name: "MACUBE",
      email: Deno.env.get("EMAIL_FROM"),
    };
    await apiInst.sendTransacEmail(sendEMTP);
    return "OK";
  } catch (e) {
    console.log(e);
    return `ERROR, ${e}`
  }
}

interface EmtpProp {
  para: string;
  nombre: string;
  titulo: string;
  contenido: string;
}
