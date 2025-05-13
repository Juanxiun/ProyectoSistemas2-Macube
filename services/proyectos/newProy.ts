import {
  typeDocumentos,
  typeProyectos,
  typeProyFases,
  typeProyInspecciones,
  typeProyPagos,
} from "../../type/typeProyectos.ts";
import { db } from "../../database/connect.ts";

const query = await db();

export const newProy = async (datos: typeProyectos) => {
  try {
    await query.query(
      "CALL createProy(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        datos.arq,
        datos.cli,
        datos.nomproy,
        datos.tipproy,
        datos.iniproy,
        datos.preproy,
        datos.depproy,
        datos.dirproy,
        datos.imgproy,
      ],
    );
    return "OK"
  } catch (error) {
    console.log("ERROR al crear proyecto\n", error);
    return `ERROR, ${error}`;
  }
};

export const newProyP = async (datos: typeProyPagos) => {
  try {
    await query.query(
      "CALL createProyP(?,?,?,?,?)",
      [
        datos.proy,
        datos.tippag,
        datos.despag,
        datos.monpag,
        datos.fecpag,
      ],
    );
    return "OK";
  } catch (error) {
    console.log("ERROR al crear proyecto\n", error);
    return `ERROR, ${error}`;
  }
};

export const newProyI = async (datos: typeProyInspecciones) => {
  try {
    await query.query(
      "CALL createProyI(?,?,?,?,?)",
      [
        datos.proy,
        datos.tipins,
        datos.desins,
        datos.fecins,
        datos.estins,
      ],
    );
    return "OK";
  } catch (error) {
    console.log("ERROR al crear proyecto\n", error);
    return `ERROR, ${error}`;
  }
};

export const newProyF = async (datos: typeProyFases) => {
  try {
    await query.query(
      "CALL createProyF(?,?,?,?)",
      [
        datos.proy,
        datos.tipfas,
        datos.nomfas,
        datos.fecfas,
      ],
    );
    return "OK";
  } catch (error) {
    console.log("ERROR al crear proyecto\n", error);
    return `ERROR, ${error}`;
  }
};

export const newProyD = async (datos: typeDocumentos) => {
  try {
    await query.query(
      "CALL createProyD(?,?,?,?,?)",
      [
        datos.proy,
        datos.nomdoc,
        datos.tipdoc,
        datos.arcdoc,
        datos.pubdoc,
      ],
    );
    return "OK";
  } catch (error) {
    console.log("ERROR al crear proyecto\n", error);
    return `ERROR, ${error}`;
  }
};
