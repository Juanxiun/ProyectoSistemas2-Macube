import { isValidNumber } from "$std/semver/_shared.ts";
import { db } from "../../../database/connect.ts";

export const valLogin = (
  cod: string | number,
  pass: string,
) => {
  if (isValidNumber(parseInt(cod.toString()))) {
    if (cod.toString().length < 7) {
      return `ERROR. Codigo/ci menor a los digitos esperados`;
    }
    if (cod.toString().length > 10) {
      return `ERROR. Codigo/ci mayor a los digitos esperados`;
    }
    if (!/^[0-9]+$/.test(String(cod))) {
      return `ERROR. Codigo/ci incluye caracteres especiales no validos`;
    }
  } else {
    if (cod.toString().length > 12) {
      return `ERROR. Codigo supera el limite de caracteres`;
    }
    if (cod.toString().length < 7) {
      return `ERROR. Codigo es menor al limite de caracteres`;
    }
    if (!/^[a-zA-Z0-9]+$/.test(String(cod))) {
      return `ERROR. Ingreso de CI/Codigo no valido`;
    }
  }

  if (pass.length < 8) {
    return `ERROR. Ingreso de CI/Codigo no valido`;
  }
  if (pass.length > 100) {
    return `ERROR. Ingreso de CI/Codigo no valido`;
  }
};

export const valRegister = async (
  { codigo, ci, nombre, apellido, direccion, telefono, correo, contra }:
    dataCliente,
) => {
  //validacion por si se ingresa el codigo
  if (codigo && codigo.length > 0) {
    if (codigo.length < 2) return `ERROR. Codigo es menor a la cantidad de caracteres valida`;
    if (codigo.length > 10) return `ERROR. Codigo es mayor a la cantidad de caracteres valida`;
  }

  //validaciones para el ci
  if (ci.toString().length < 6) return `ERROR. ci es menor a 6 digitos`;
  if (ci.toString().length > 9) return `ERROR. ci es mayor a 9 digitos`;
  if (!/^[0-9]+$/.test(String(ci))) {
    return `ERROR. ci incluye caracteres especiales no validos`;
  }

  //nombre y apellido
  if (nombre.length < 2 || nombre.length > 50) {
    return `ERROR. nombre no cumple con el tamaño valido, mayor a 2 y menor a 50 digitos`;
  }
  if (apellido.length < 2 || apellido.length > 70) {
    return `ERROR. apellido no cumple con el tamaño valido, mayor a 2 y menor a 70 digitos`;
  }

  //dieccion
  if (direccion) {
    if (direccion.length < 2 || direccion.length > 100) {
      return `ERROR. direccion no cumple con el tamaño valido, mayor a 2 y menor a 100 digitos`;
    }
  }

  //telefono
  if (telefono.toString().length < 6) {
    return `ERROR. telefono es menor a 6 digitos`;
  }
  if (telefono.toString().length > 9) {
    return `ERROR. telefono es mayor a 9 digitos`;
  }
  if (!/^[0-9]+$/.test(String(telefono))) {
    return `ERROR. telefono incluye caracteres especiales no validos`;
  }

  //correo
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return `ERROR. correo no tiene un formato valido`;
  }
  if (correo.length > 100) {
    return `ERROR. correo excede el tamaño maximo permitido de 100 caracteres`;
  }

  //contra
  if (contra) {
    if (contra.length < 8) {
      return `ERROR. la contraseña es menor a 8 caracteres, no es válida`;
    }
    if (contra.length > 100) {
      return `ERROR. la contraseña es mayor a 100 caracteres, no es válida`;
    }
    if (/\s/.test(contra)) {
      return `ERROR. la contraseña no debe contener espacios`;
    }
    if (!/[A-Z]/.test(contra)) {
      return `ERROR. la contraseña debe contener al menos una letra mayúscula`;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(contra)) {
      return `ERROR. la contraseña debe contener al menos un carácter especial`;
    }
  }

  const val = codigo !== undefined
    ? await duplicateData(ci, telefono, correo, codigo)
    : await duplicateData(ci, telefono, correo, direccion);

  if (val.includes("ERROR.")) return val;

  return "OK";
};

const duplicateData = async (
  ci: number,
  tel: number,
  cor: string,
  dir?: string,
  cod?: string,
): Promise<string> => {
  const connect = await db();

  let r;

  if (cod !== undefined) {
    r = await connect.query("SELECT codigo FROM arquitectos WHERE codigo = ?", [
      cod,
    ]);
    if (r.length > 0) {
      return "ERROR. El código del arquitecto ya está registrado";
    }

    r = await connect.query("SELECT ci FROM arquitectos WHERE ci = ?", [ci]);
    if (r.length > 0) return "ERROR. El CI del arquitecto ya existe";

    r = await connect.query(
      "SELECT telefono FROM arquitectos WHERE telefono = ?",
      [
        tel,
      ],
    );
    if (r.length > 0) return "ERROR. El teléfono del arquitecto ya existe";

    r = await connect.query("SELECT correo FROM arquitectos WHERE correo = ?", [
      cor,
    ]);
    if (r.length > 0) return "ERROR. El correo del arquitecto ya existe";
  } else {
    r = await connect.query("SELECT ci FROM clientes WHERE ci = ?", [ci]);
    if (r.length > 0) return "ERROR. El CI del cliente ya existe";

    r = await connect.query(
      "SELECT telefono FROM clientes WHERE telefono = ?",
      [
        tel,
      ],
    );
    if (r.length > 0) return "ERROR. El teléfono del cliente ya existe";

    r = await connect.query("SELECT correo FROM clientes WHERE correo = ?", [
      cor,
    ]);
    if (r.length > 0) return "ERROR. El correo del cliente ya existe";

    if (dir) {
      r = await connect.query(
        "SELECT direccion FROM clientes WHERE direccion = ?",
        [dir],
      );
      if (r.length > 0) return "ERROR. La dirección del cliente ya existe";
    }
  }

  return "";
};

interface dataCliente {
  codigo?: string;
  ci: number;
  nombre: string;
  apellido: string;
  direccion?: string;
  telefono: number;
  correo: string;
  contra?: string;
}
