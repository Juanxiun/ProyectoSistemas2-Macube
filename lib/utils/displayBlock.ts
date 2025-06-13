let display = true;

export const setLoadBlock = (estado: boolean) => {
  display = estado;
};

export const getLoadBlock = () => {
  return display;
};

export const delLoadBlock = () => {
  display = false;
};
