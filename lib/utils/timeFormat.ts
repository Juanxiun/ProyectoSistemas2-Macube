export function getTime(): string {
  const now = new Date();

  const pad = (num: number): string => num.toString().padStart(2, "0");

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function convertTime(datetimeLocalString: string): string {
  if (!datetimeLocalString) {
    throw new Error("El valor datetime-local no puede estar vacío.");
  }

  const dbDateTimeString = datetimeLocalString.replace("T", " ") + ":00";

  const date = new Date(datetimeLocalString);
  if (isNaN(date.getTime())) {
    throw new Error("Formato datetime-local inválido.");
  }

  return dbDateTimeString;
}

export function formatTime(dbDateTimeString: string | Date): string {
  try {
    // Si es string, elimina segundos/milisegundos si existen
    let date: Date;

    if (typeof dbDateTimeString === "string") {
      // Limpia la cadena (elimina segundos y milisegundos)
      const cleanedDateString = dbDateTimeString
        .replace(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}).*/, "$1") // Extrae YYYY-MM-DD HH:MM
        .replace(" ", "T"); 

      date = new Date(cleanedDateString);
    } else {
      date = dbDateTimeString;
    }

    // Valida que la fecha sea válida
    if (isNaN(date.getTime())) {
      console.error("Fecha inválida:", dbDateTimeString);
      return "";
    }

    // Formatea a YYYY-MM-DDTHH:MM
    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${
      pad(date.getDate())
    }T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } catch (error) {
    console.error("Error al formatear fecha:", error);
    return "";
  }
}
