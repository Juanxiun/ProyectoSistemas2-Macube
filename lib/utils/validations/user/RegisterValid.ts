interface registroProps {
  ci: number;
  extension: string;
  nombres: string;
  apellidos: string;
  telefono1: number;
  telefono2?: number;
  email?: string;
  pass: string;
}

const valRegCli = (
  { ci, extension, nombres, apellidos, telefono1, telefono2, email, pass }:
    registroProps,
) => {

    if (!ci || typeof ci !== 'number') {
        return "ERROR. CI debe ser un número.";
    }
    if (ci.toString().length < 5 || ci.toString().length > 9) {
        return "ERROR. CI debe tener entre 5 y 9 dígitos.";
    }

    if (!extension || typeof extension !== 'string' || extension.trim() === '') {
        return "ERROR. Extensión no puede estar vacía.";
    }

    if (!nombres || typeof nombres !== 'string' || nombres.trim() === '') {
        return "ERROR. Nombres no pueden estar vacíos.";
    }

    if (!apellidos || typeof apellidos !== 'string' || apellidos.trim() === '') {
        return "ERROR. Apellidos no pueden estar vacíos.";
    }

    if (!telefono1 || typeof telefono1 !== 'number') {
        return "ERROR. Teléfono 1 debe ser un número.";
    }
    if (telefono1.toString().length < 5 || telefono1.toString().length > 9) {
        return "ERROR. Teléfono 1 debe tener entre 5 y 9 dígitos.";
    }

    if (telefono2) {
        if (typeof telefono2 !== 'number') {
            return "ERROR. Teléfono 2 debe ser un número.";
        }
        if (telefono2.toString().length < 5 || telefono2.toString().length > 9) {
            return "ERROR. Teléfono 2 debe tener entre 5 y 9 dígitos.";
        }
    }

    if (email) {
        if (typeof email !== 'string') {
            return "ERROR. Email debe ser un texto.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "ERROR. Email no tiene un formato válido.";
        }
    }

    if (!pass || typeof pass !== 'string') {
        return "ERROR. Contraseña debe ser un texto.";
    }
    if(pass.length > 99){
        return "ERROR. Contraseña debe ser menor a 100 caracteres";
    }
    if (pass.length < 6) {
        return "ERROR. Contraseña debe tener al menos 6 caracteres.";
    }

    return("EXITO.")

};


export { valRegCli };