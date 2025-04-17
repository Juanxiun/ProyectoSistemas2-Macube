interface proyInProps {
  asunto: string;
  detalles: string;
  estado: string;
}

const proyectoInVal = (
  { asunto, detalles, estado }: proyInProps,
): Promise<string> => {
  let message = "EXITO. inspeccion validada";

  //validacion de asunto
  if (!asunto) message = "ERROR. no ingreso un asunto de reunion";

  //validacion de detalles
  if (!detalles) message = "ERROR. no ingreso el detalle de la inspeccion";
  if (detalles.length < 2 || detalles.length > 999) {
    message = "ERROR. detalle fuera de rango";
  }
  if (!/^[A-Za-z0-9 ]+$/.test(detalles)) {
    message = "ERROR. detalle con caracteres invalidos";
  }

  //estado
  if(!estado) message = "ERROR. no asigno un estado de la junta"

  return Promise.resolve(message);
};


export {proyectoInVal};