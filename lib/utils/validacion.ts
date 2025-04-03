interface DataLogin {
    ci?: number;
    password?: string;
  }
  interface DataRegister {
    ci?: number;
    extension?: string;
    nombres?: string;
    apellidos?: string;
    telefono1?: number;
    telefono2?: number;
    correo?: string;
    pass?: string;
  }
  export function ValLogin({ ci, password }: DataLogin): Promise<string> {
    try {
      if (ci === undefined || password === undefined) {
        return Promise.resolve("Faltan parámetros");
      }
  
      if (isNaN(Number(ci))) {
        return Promise.resolve("El CI solo puede contener números.");
      }
  
      const ciLength = ci.toString().length;
      if (ciLength > 10) {
        return Promise.resolve("El CI tiene más de 10 caracteres.");
      }
      if (ciLength < 6) {
        return Promise.resolve("El CI tiene menos de 6 caracteres.");
      }
  
      if (typeof password !== "string") {
        return Promise.resolve("La contraseña no es válida.");
      }
  
      if (password.length > 40) {
        return Promise.resolve("La contraseña tiene más de 40 caracteres.");
      }
      if (password.length < 8) {
        return Promise.resolve("La contraseña tiene menos de 8 caracteres.");
      }
  
      return Promise.resolve("Validación exitosa");
    } catch (error) {
      console.error("Error en la validación:", error);
      return Promise.resolve("Error en la validación.");
    }
  }
  
  export function ValRegister({
    ci,
    extension,
    nombres,
    apellidos,
    telefono1,
    telefono2,
    correo,
    pass,
  }: DataRegister): Promise<string> {
    let _errores: string = "";
  
    try {
      // Validación de CI (Carnet de identidad)
      if (!ci || isNaN(ci) || ci < 100000 || ci > 9999999999) {
        _errores += " El CI debe ser un número entre 6 y 10 dígitos.";
        return Promise.resolve(_errores);
      }
  
      // Validación de extensión (Máximo 3 caracteres, solo letras)
      if (extension && !/^[a-zA-Z]{1,3}$/.test(extension)) {
        _errores +=
          " La extensión solo puede contener letras y hasta 3 caracteres.";
        return Promise.resolve(_errores);
      }
  
      // Validación de nombres y apellidos (Solo letras y espacios, máximo 50 caracteres)
      if (!nombres || !/^[a-zA-Z\s]{1,50}$/.test(nombres)) {
        _errores +=
          " El nombre solo puede contener letras y espacios, máximo 50 caracteres.";
        return Promise.resolve(_errores);
      }
      if (!apellidos || !/^[a-zA-Z\s]{1,50}$/.test(apellidos)) {
        _errores +=
          " El apellido solo puede contener letras y espacios, máximo 50 caracteres.";
        return Promise.resolve(_errores);
      }
  
      // Validación de teléfonos (Deben ser números de 7 u 8 dígitos)
      if (
        !telefono1 || isNaN(telefono1) || !/^\d{7,8}$/.test(telefono1.toString())
      ) {
        _errores += "El teléfono 1 debe ser un número de 7 u 8 dígitos.";
        return Promise.resolve(_errores);
      }
      if (telefono2 && (!/^\d{7,8}$/.test(telefono2.toString()))) {
        _errores += "El teléfono 2 debe ser un número de 7 u 8 dígitos.";
        return Promise.resolve(_errores);
      }
  
      // Validación de correo electrónico
      if (!correo || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(correo)) {
        _errores += "El correo electrónico no es válido.";
        return Promise.resolve(_errores);
      }
  
      // Validación de contraseña
      if (!pass || pass.length < 8 || pass.length > 40) {
        _errores += " La contraseña debe tener entre 8 y 40 caracteres.";
      }
      if (pass && !/[A-Z]/.test(pass)) {
        _errores += " La contraseña debe contener al menos una letra mayúscula.";
      }
      if (pass && !/[a-z]/.test(pass)) {
        _errores += " La contraseña debe contener al menos una letra minúscula.";
      }
      if (pass && !/\d/.test(pass)) {
        _errores += " La contraseña debe contener al menos un número.";
      }
      if (pass && !/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
        _errores += " La contraseña debe contener al menos un carácter especial.";
      }
      return Promise.resolve(_errores);
    } catch (error) {
      console.log(error);
      return Promise.resolve("Error en la validación.");
    }
  }
  