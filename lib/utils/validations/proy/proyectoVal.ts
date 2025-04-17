interface proyProps {
  cicli: number;
  nombre: string;
  tipo: string;
  precio: number;
  inicio: Date;
  imagen: string;
  direccion: string;
}

const proyectoVal = (
  { cicli, nombre, tipo, precio, inicio, imagen, direccion }: proyProps,
) => {
  let message: string = "EXITO. validacion completada";

  //validacion del ci
  if (!cicli) return message = "ERROR. cliente no asignado";

  //validacion del nombre
  if (!nombre)  return message = "ERROR. nombre ";
  if (nombre.length <= 0 || nombre.length > 99) return message = "fuera de rango";
  if (!/^[A-Za-z0-9-. ]+$/.test(nombre)) {
    return message = " no debe contener caracteres especiales";
  }

  //validacion de tipo
  if (!tipo) return message = "ERROR. tipo de proyecto no asignado";

  //validacion de precio
  if (!precio) return message = "ERROR. precio no ingresado";
  if (precio < 1) return message = "ERROR. precio no puede ser negativo";
  if (precio > 999999) {
    return message = "ERROR. precio no puede tener un valor tan alto";
  }

  //validaciones de inicio
  if (!inicio) return message = "ERROR. fecha no insertada";

  //validacion de imagen
  if (!imagen) return  message = "ERROR. imagen no ingresada";

  //validacion de direccion
  if (!direccion) return message = "ERROR. direccion no ingresada";
  if (direccion.length < 10 || direccion.length > 250) {
    return message = "ERROR. direccion fuera de rango";
  }
  if (!/^[A-Za-z0-9-. ]+$/.test(direccion)) {
    return message = "ERROR. direccion no puede contener caracteres especiales";
  }

  return Promise.resolve(message);
};

export { proyectoVal };
