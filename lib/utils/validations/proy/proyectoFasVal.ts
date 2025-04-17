interface proyFaProps {
  fase: string;
  descripcion: string;
}

const proyectoFaVal = (
  { fase, descripcion }: proyFaProps,
): Promise<string> => {
  let message = "EXITO. fase validada";

  //validacion de la fase
  if (!fase) message = "ERROR. debe de ingresar una fase";
  if (fase.length < 0 || fase.length > 99) {
    message = "ERROR. fase fuera de rango";
  }
  if (!/^[A-Za-z0-9 ]+$/.test(fase)) {
    message = "ERROR. fase caracteres invalidos";
  }

  //validacion de descripcion
  if (!descripcion) message = "ERROR. no ingreso la descripcion";
  if (descripcion.length < 0 || descripcion.length > 999) {
    message = "ERROR. descripcion fuera de rango";
  }
  if (!/^[A-Za-z0-9 ]+$/.test(descripcion)) {
    message = "ERROR. descripcion caracteres invalidos";
  }

  return Promise.resolve(message);
};

export {proyectoFaVal};