import { db } from "../../database/connect.ts";

const connect = await db();

export type typeSaldo = {
  id: number | string;
  arq: string;
  nomproy: string;
  precio_proyecto: number;
  total_pagado: number;
  saldo_pendiente: number;
};

export const getReporteSaldo = async (arqCodigo: string): Promise<typeSaldo[]> => {
  try {
    const result = await (await connect).query(
      "CALL reporteSaldo(?)",
      [arqCodigo],
    );
    if (Array.isArray(result) && result.length > 0) {
      return result as typeSaldo[];
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};