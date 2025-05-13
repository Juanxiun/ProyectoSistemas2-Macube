export interface typeProyectos{
    id?: number;
    arq?: string;
    cli?: number;
    nomproy: string;
    tipproy: string;
    iniproy?: string;
    preproy: number;
    depproy: string;
    dirproy:string;
    imgproy: string;
    habilitado?: number | 1
}

export interface typeDocumentos{
    id?: number;
    proy?: number;
    nomdoc: string;
    tipdoc: string;
    arcdoc: string;
    pubdoc?: string; 
}

export interface typeProyFases{
    id?: number;
    proy?: number;
    tipfas: string;
    nomfas: string;
    fecfas?: string;
};

export interface typeProyInspecciones{
    id?: number;
    proy?: number;
    tipins: string;
    desins: string;
    fecins: string;
    estins: number;
}

export interface typeProyPagos{
    id?: number;
    proy?: number;
    tippag: string;
    despag: string;
    monpag: number;
    fecpag?: string;
};