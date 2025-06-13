import { registrarCodigo } from "../../verificacion/newVer.ts";
import { messageEmail } from "../enviarEmail.ts";
import { generarHtmlCodigo } from "../page/cod.page.ts";

interface CodProp{
    id: string;
    nombre: string;
    email: string;
    codigo: string;
}

export const MandarCodigo = async(
    { id, nombre, email, codigo }: CodProp
) => {
    try{
        const pagCont = generarHtmlCodigo(nombre, codigo);

        const emailCod = await messageEmail({
            para: email,
            nombre: nombre,
            titulo: "Codigo para registro",
            contenido: pagCont,
        });

        if(emailCod !== "OK") return emailCod;
        const codigoReg = await registrarCodigo(id, email, codigo);

        if(codigoReg !== "OK") return codigoReg;
        return "OK";

    }catch(e){
        console.log(e);
        return `ERROR, ${e}`
    }

}
