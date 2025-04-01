//modelo proyectos
export interface MOD_PROYECTOS{
    id: number;
    cicli: number;
    codearq: string;
    nombre: string;
    tipo: string;
    inicio: Date;
    final?: Date;
    imagen: string;
    habilitado: number;
}

//modelo documentos de proyectos
export interface MOD_PROY_DOCUMENTOS{
    id: number;
    idpro: number;
    titulo: string;
    tipodoc: string;
    publicado: Date;
    archivo: string;
    descripcion: string
}

//modelo fases de proyectos
export interface MOD_PROY_FASES{
    id: number;
    idpro: number;
    fase: string;
    descripcion: string;
}

//modelo inspeccion de proyctos
export interface MOD_PROY_INSPECCIONES{
    id: number;
    idpro: number;
    asunto: string;
    detalles: string;
    fecha: Date;
    estado: number
}

//modelo pagos de proyectos
export interface MOD_PROYPAGOS{
    id: number;
    idpro: number;
    fecha: Date;
    monto: number;
    tipopago: string;
    detalles: string;
}