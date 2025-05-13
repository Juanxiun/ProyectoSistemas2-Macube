export interface typeArquitectos {
  codigo: string;
  ci?: number;
  extension?: string;
  nombre: string;
  apellido: string;
  telefono: number;
  correo: string;
  contra?:string;
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
  contra?:string;
}
