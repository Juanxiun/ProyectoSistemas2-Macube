export interface typeArquitectos {
  codigo: string;
  ci?: number;
  extension?: string;
  nombre: string;
  apellido: string;
  telefono: number;
  correo: string;
  contra?: string;
}

export interface typeClientes {
  ci: number;
  extension?: string;
  nombre: string;
  apellido: string;
  departamento?: string;
  direccion: string;
  telefono: number;
  correo: string;
  contra?: string;
}

export interface typeContactos {
  ci: string;
  nombre: string;
  telefono: string;
  correo: string;
}

export interface typeMesanje {
  id: string;
  codigo: string;
  correo: string;
  telefono: string;
  nombre: string;
  asunto: string;
  contenido: string;
}
