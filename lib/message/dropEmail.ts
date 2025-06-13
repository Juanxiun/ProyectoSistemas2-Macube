import { dropCodigo } from "../../services/usuarios/newPass.ts";

export default function DropEmail(userId: string){
    dropCodigo(userId);
}