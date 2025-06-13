export const imageFile = async (img: File) => {
  //converti imagen
  const buffer = await img.arrayBuffer();
  const base64Image = btoa(String.fromCharCode(...new Uint8Array(buffer)));

  const image = `data:image/jpeg;base64,${base64Image}`;

  return image;
};
