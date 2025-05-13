import { db } from "../../database/connect.ts";
const query = await db();


// Proyectos
export const viewProy = async (codigo?: string, id?: number) => {
  try {
    let queryStr =
      `SELECT id, arq, cli, nomproy, tipproy, iniproy, preproy, depproy, dirproy, imgproy FROM proyectos`;
    const params: (string | number)[] = [];

    if (codigo) {
      queryStr += ` WHERE arq=?`;
      params.push(codigo);
    }

    if (id) {
      queryStr += codigo ? ` AND id=?` : ` WHERE id=?`;
      params.push(id);
    }

    const result = await query.query(queryStr + " order by id DESC", params );

    return result as proyProp[] ?? [];
  } catch (error) {
    console.log("ERROR proyecto view,\n", error);
    return `ERROR, ${error}`;
  }
};


// Pagos
export const viewProyP = async (idproy?: number) => {
  try {
    let queryStr = `SELECT * FROM proy_pagos`;
    const params: number[] = [];

    if (idproy) {
      queryStr += ` WHERE proy=?`;
      params.push(idproy);
    }

    const result = await query.query(queryStr, params);

    return result as proyPProp[] ?? [];
  } catch (error) {
    console.log("ERROR proyecto Pag view,\n", error);
    return `ERROR, ${error}`;
  }
};


// Fases
export const viewProyF = async (idproy?: number) => {
  try {
    let queryStr = `SELECT * FROM proy_fases`;
    const params: number[] = [];

    if (idproy) {
      queryStr += ` WHERE proy=?`;
      params.push(idproy);
    }

    const result = await query.query(queryStr, params);

    return result as proyFProp[] ?? [];
  } catch (error) {
    console.log("ERROR proyecto Fas view,\n", error);
    return `ERROR, ${error}`;
  }
};


// Documentos
export const viewProyD = async (idproy?: number) => {
  try {
    let queryStr = `SELECT * FROM proy_documentos`;
    const params: number[] = [];

    if (idproy) {
      queryStr += ` WHERE proy=?`;
      params.push(idproy);
    }

    const result = await query.query(queryStr, params);

    return result as proyDProp[] ?? [];
  } catch (error) {
    console.log("ERROR proyecto Doc view,\n", error);
    return `ERROR, ${error}`;
  }
};


// Inspecciones
export const viewProyI = async (idproy?: number) => {
  try {
    let queryStr = `SELECT * FROM proy_inspecciones`;
    const params: number[] = [];

    if (idproy) {
      queryStr += ` WHERE proy=?`;
      params.push(idproy);
    }

    const result = await query.query(queryStr, params);

    return result as proyIProp[] ?? [];
  } catch (error) {
    console.log("ERROR proyecto Ins view,\n", error);
    return `ERROR, ${error}`;
  }
};


//obtener id ultimoProy
export const viewProyIDUlt = async (cod: string) => {
  try {
    const result = await query.query(
      "SELECT id FROM proyectos WHERE arq=? ORDER BY id DESC LIMIT 1",
      [cod],
    );
    return result ?? [];
  } catch (error) {
    console.log("ERROR proyecto IDop view,\n", error);
    return `ERROR, ${error}`;
  }
};

interface proyProp {
  id: string;
  arq: string;
  cli: string;
  nomproy: string;
  tipproy: string;
  iniproy: Date;
  preproy: string;
  depproy: string;
  dirproy: string;
  imgproy: string;
}

interface proyIProp {
  id: string;
  proy: string;
  tipins: string;
  desins: string;
  fecins: string;
  estins: string;
}

interface proyDProp {
  id: string;
  proy: string;
  nomdoc: string;
  tipdoc: string;
  arcdoc: string;
  pubdoc: string;
}

interface proyFProp {
  id: string;
  proy: string;
  nomfas: string;
  fecfas: string;
}

interface proyPProp {
  id: string;
  proy: string;
  tippag: string;
  despag: string;
  monpag: string;
  fecpag: string;
}
