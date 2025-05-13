import {
  typeDocumentos,
  typeProyectos,
  typeProyFases,
  typeProyInspecciones,
  typeProyPagos,
} from "../../type/typeProyectos.ts";
import { db } from "../../database/connect.ts";

const query = await db();

export const uptProy = async (datos: typeProyectos) => {

  try {
    await query.query(
      "CALL updateProy(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        datos.id,
        datos.cli,
        datos.nomproy,
        datos.tipproy,
        datos.preproy,
        datos.depproy,
        datos.dirproy,
        datos.imgproy,
      ],
    );

    return "OK";
  } catch (error) {
    console.log("ERROR al crear proyecto\n", error);
    return `ERROR, ${error}`;
  }
};

export const uptProyP = async (datos: typeProyPagos) => {
  try {
    await query.query(
      "CALL updateProyP(?,?,?,?,?)",
      [
        datos.id,
        datos.tippag,
        datos.despag,
        datos.monpag,
      ],
    );
    return "OK";
  } catch (error) {
    console.log("ERROR al crear proyecto P\n", error);
    return `ERROR, ${error}`;
  }
};

export const uptProyI = async (datos: typeProyInspecciones) => {
  try {
    await query.query(
      "CALL updateProyI(?,?,?,?,?)",
      [
        datos.id,
        datos.tipins,
        datos.desins,
        datos.fecins,
        datos.estins,
      ],
    );
    return "OK";
  } catch (error) {
    console.log("ERROR al crear proyecto I\n", error);
    return `ERROR, ${error}`;
  }
};

export const uptProyF = async (datos: typeProyFases) => {
  try {
    await query.query(
      "CALL updateProyF(?,?,?)",
      [
        datos.id,
        datos.tipfas,
        datos.nomfas,
      ],
    );
    return "OK"; 
  } catch (error) {
    console.log("ERROR al crear proyecto F\n", error);
    return `ERROR, ${error}`;
  }
};

export const uptProyD = async (datos: typeDocumentos) => {
  try {
    await query.query(
      "CALL updateProyD(?,?,?,?)",
      [
        datos.id,
        datos.nomdoc,
        datos.tipdoc,
        datos.arcdoc,
      ],
    );
    return "OK";
  } catch (error) {
    console.log("ERROR al crear proyecto D\n", error);
    return `ERROR, ${error}`;
  }
};
