let blur = false;

export const setBlur = (val: boolean) => {
  blur = val;
};

export const getBlur = () => {
  return blur;
}

export const toggleBlur = () => {
  blur = !blur;
};