let loading: { estado: boolean; mensaje?: string } | null = null;

export const setLoadScreen = (estado: boolean, mensaje?: string) => {
  loading = { estado, mensaje };
};

export const getLoadScreen = () => {
  return loading;
};

export const delLoadScreen = () => {
  loading = null;
};