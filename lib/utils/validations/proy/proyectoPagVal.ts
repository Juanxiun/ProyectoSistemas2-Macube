import { isValidNumber } from "$std/semver/_shared.ts";

interface proyPaProps {
  monto: number;
  tipopago: string;
  detalles: string;
  precio: number
}

const proyectoPaVal = (
  { monto, tipopago, detalles, precio }: proyPaProps,
)=> {
  let message = "EXITO. pago validado";

  //validacion monto
  if (!monto) return message = "ERROR. debe de ingresar un monto";
  if (!isValidNumber(monto))return  message = "ERROR. monto debe ser numerico";
  if (monto < 0)return message = "ERROR. monto no puede ser negativo";
  if (monto < 1 || monto > 999999)return  message = "ERROR. monto fuera de rango";
  if(monto > precio) return message = "ERROR. monto no puede ser mayor al precio";

  //validacion tipo pago
  if (!tipopago)return  message = "ERROR. no ingreso el tipo de pago";
  if (tipopago.length < 2 || tipopago.length > 999) {
    return  message = "ERROR. tipo de pago fuera de rango";
  }
  if (!/^[A-Za-z0-9-. ]+$/.test(detalles)) {
    return  message = "ERROR. detalle con caracteres invalidos";
  }

  //validacion detalles
  if (!detalles) return  message = "ERROR. no ingreso el detalle del pago";
  if (detalles.length < 2 || detalles.length > 999) {
    return  message = "ERROR. detalle fuera de rango";
  }
  if (!/^[A-Za-z0-9-. ]+$/.test(detalles)) {
    return  message = "ERROR. detalle con caracteres invalidos";
  }

  return message;
};

export { proyectoPaVal };
