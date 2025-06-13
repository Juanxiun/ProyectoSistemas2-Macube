
//convertir un archivo a base64
// deno-lint-ignore require-await
export async function convertFile64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix if present
        const formatted = base64String.replace(/^data:.+;base64,/, '');
        resolve(formatted);
      };

      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };

      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
}

//funcion para convertir un base64 a un archivo
export function base64ToFile(base64: string, filename: string, mimeType: string): File {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}
