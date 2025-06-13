export async function fetchData<T>(
  url: string,
  options: RequestInit = {},
  setMessage?: (type: string, msg: string) => void,
): Promise<T | null> {
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      setMessage?.(
        "alerta",
        data.message ?? "Error en la respuesta del servidor",
      );
      return null;
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    setMessage?.("error", `Error de red: ${error}`);
    return null;
  }
}
