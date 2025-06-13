export const DescargaArc = (doc: DocumentoProps) => {
  if (!doc.arcdoc) return;

  // Obtener tipo MIME desde el base64
  const match = doc.arcdoc.match(/^data:(.*?);base64,/);
  const mimeType = match?.[1] || "application/octet-stream";

  // Obtener extensión sugerida
  const extensionMap: Record<string, string> = {
    "application/pdf": "pdf",
    "application/octet-stream": "dwg",
    "image/png": "png",
    "image/jpeg": "jpg",
    "text/plain": "txt",
  };

  const extension = extensionMap[mimeType] || "dwg";
  const nombre = `${doc.nomdoc || "documento"}.${extension}`;

  // Crear enlace y forzar descarga
  const link = document.createElement("a");
  link.href = doc.arcdoc;
  link.setAttribute("download", nombre);
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


interface DocumentoProps {
  id?: string;
  proy?: string;
  nomdoc?: string;
  tipdoc?: string;
  arcdoc?: string;
  pubdoc?: string;
}
