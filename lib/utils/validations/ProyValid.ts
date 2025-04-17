interface dataProps {
  cicli: number;
  nombre: string;
  tipo: string;
  precio: number;
  inicio: Date;
  imagen: string;
}

const proyValid = (
  { cicli, nombre, tipo, precio, inicio, imagen }: dataProps,
) => {
  if (!cicli || typeof cicli !== "number") {
    return "ERROR. CI debe ser un numero";
  }
  if (cicli.toString().length < 5 || cicli.toString().length > 9) {
    return "ERROR. CI debe tener entre 5 y 9 dígitos.";
  }

  if (nombre.length < 5 || nombre.length > 99) {
    return "ERROR. Nombre debe de tener entre 5 y 100 caracteres";
  }
  if (!/^[a-zA-Z0-9 ]+$/.test(nombre)) {
    return "ERROR. Nombre no debe contener caracteres especiales \n (solo letras A-Z y numeros 1-9)";
  }

  if (!tipo || typeof tipo !== "string") {
    return "ERROR. tipo proyecto no definido correctamente";
  }

  if (!precio || typeof precio !== "number") {
    return "ERROR. el precio no es numero o no fue definido";
  }
  if (precio < 0 || precio > 999999) {
    return "ERROR. precio tiene un valor de 1 o muy alto";
  }
  if (precio <= -1) {
    return "ERROR. precio no puede ser negativo";
  }

  const fecha: Date = new Date(hoy.toString());

  if (!inicio) {
    return "ERROR. inicio de proyecto no especificado";
  }
  if (inicio < fecha) {
    return "ERROR. la fecha no puede ser menor a la fecha actual";
  }
  if (inicio > fecha) {
    return "ERROR. la fecha no puede ser mayor a la fecha actual";
  }

  if (!imagen) {
    return "ERROR. imagen no puede ser null";
  }

  return ("");
};

const hoy = () => {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
};

export { proyValid };
