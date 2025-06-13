import { isValidNumber } from "$std/semver/_shared.ts";
import { db } from "../../../database/connect.ts";

const connect = await db();

export const valProyPa = async (
  tippag: string,
  despag: string,
  monpag: number,
  idproy: number,
): Promise<string> => {
  //tipo de pago
  if (tippag.length === 0) return "No asigno el tipo de pago";

  //descripcion de pago
  if (despag.length === 0) return "No inserto la descripcion del pago";
  if (despag.length < 3) {
    return "Descripcion de pago muy corta (minimo 5 caracteres)";
  }
  if (despag.length > 250) {
    return "Descripcion de pago muy larga (maximo 250 caracteres)";
  }

  //monto de pago
  if (!isValidNumber(monpag)) return "Monto de pago no valido";
  if (monpag < 0) return "Monto de pago no puede ser negativo";

  console.log(idproy)

  // Obtener el precio total del proyecto
  const proyecto = await connect.query(
    "SELECT preproy FROM proyectos WHERE id = ?",
    [idproy]
  );

  
  const precioTotal = parseFloat(proyecto[0]?.preproy.toString());

  //console.log("precio de proyecto ", precioTotal);

  // Obtener la suma de todos los pagos existentes
  const pagosExistentes = await connect.query(
    "SELECT SUM(monpag) as total FROM proy_pagos WHERE proy = ?",
    [idproy]
  );

  const sumaPagos = pagosExistentes[0]?.total ? parseFloat(pagosExistentes[0]?.total.toString()) : 0;

  //console.log("suma de pagos ", sumaPagos);


  // Verificar si el nuevo pago más la suma existente excede el precio total
  if (sumaPagos + monpag > precioTotal) {
    return "Monto es mayor al precio final del proyecto";
  }

  return "OK";
};