interface DataLogin {
    ci?: number;
    password?: string;
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
  