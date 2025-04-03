import { MOD_PROYECTOS } from "../../database/models/proyectos/proyectoModel.ts";
import { db } from "../../database/connect.ts";


let proyectosList: MOD_PROYECTOS[] = [];
const query = db;

//GET PROYECTOS *-  *
export const getProyectos = async (id?: number): Promise<MOD_PROYECTOS[]> => {
  try {
    if (id && id > 0) {
      const result = await query.queryObject<MOD_PROYECTOS>(
        "SELECT * FROM proyectos WHERE habilitado = 1 AND id = $1",
        [id],
      );
      if (result) {
        proyectosList = result.rows;
        return proyectosList;
      } else {
        return [];
      }
    }
    const result = await query.queryObject<MOD_PROYECTOS>(
      "SELECT * FROM proyectos WHERE habilitado = 1",
    );
    if (result) {
      proyectosList = result.rows;
      return proyectosList;
    } else {
      return [];
    }
  } catch (err) {
    console.log("problema - GET - getProyecto:\n" + err);
    throw err;
  }
};

//POST PROYECTOS * - *
export const postProyectos = async (data: MOD_PROYECTOS): Promise<string> => {
  try {
    await query.queryObject(
      "INSERT INTO proyectos (cicli, codearq, nombre, tipo, inicio, imagen) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        data.cicli,
        data.codearq,
        data.nombre,
        data.tipo,
        data.inicio,
        data.imagen,
      ],
    );

    return ("success");
  } catch (err) {
    console.log("problema - POST - postProyecto:\n" + err);
    return ("failet: \n" + err);
  }
};

//PUT PROYECTOS 0~ 0
export const putProyectos = async (data: MOD_PROYECTOS): Promise<string> => {
  try {
    await query.queryObject(
      "UPDATE proyectos SET nombre = $1, tipo = $2, inicio = $3, final = $4, imagen = $5 WHERE id = $6",
      [
        data.nombre,
        data.tipo,
        data.inicio,
        data.final,
        data.imagen,
        data.id,
      ],
    );

    return ("success");
  } catch (err) {
    console.log("problema - PUT - putProyecto:\n" + err);
    return ("failet: \n" + err);
  }
};

//DELETE PROYECTOS /\ _ /\
export const deleteProyectos = async (id: number): Promise<string> => {
  try {
    await query.queryObject(
      "UPDATE proyectos SET habilitado = 0 WHERE id = $1",
      [id],
    );
    return ("success");
  } catch (err) {
    console.log("problema - PUT - putProyecto:\n" + err);
    return ("failet: \n" + err);
  }
};


