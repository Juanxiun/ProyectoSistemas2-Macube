let mensaje: { tipo: string; contx: string } | null = null;

export const setMessage = (
  _tipo: "error" | "completado" | "alerta",
  _contx: string,
) => {
  mensaje = {
    tipo: _tipo,
    contx: _contx,
  };
};

export const getMessage = () => {
  if (mensaje != null) return mensaje;
};

export const delMessage = () => {
  mensaje = null;
};
