interface proyDoProps {
  nombredoc: string;
  tipodoc: string;
  archivo: string;
  descripcion?: string;
}

const proyectoDoVal = (
  { nombredoc, tipodoc, archivo, descripcion }: proyDoProps,
): Promise<string> => {
  let message = "EXITO. docuemnto cargado";

  //nombre documento
  if (!nombredoc) message = "ERROR. no ingreso un nombre para el documento";
  if (!/^[A-Za-z0-9 ]+$/.test(nombredoc)) {
    message = "ERROR. caracter invalido detectado";
  }
  if (nombredoc.length < 2 || nombredoc.length > 99) {
    message = "ERROR. nombre fuera de rango";
  }

  //tipo documento
  if (!tipodoc) message = "ERROR. no ingreso el tipo del documento";

  //archivo
  if (!archivo) message = "ERROR. no se cargo ningun archivo";

  //descripcion de archivo
  if (descripcion) {
    if (!/^[A-Za-z0-9 ]+$/.test(descripcion)) {
      message = "ERROR. caracter invalido detectado";
    }
    if (descripcion.length < 2 || descripcion.length > 999) {
      message = "ERROR. nombre fuera de rango";
    }
  }

  return Promise.resolve(message);
};

export { proyectoDoVal };
