import { useRef } from "preact/hooks";

interface DocumentoProps {
  id?: string;
  proy?: string;
  nomdoc?: string;
  tipdoc?: string;
  arcdoc?: string;
  pubdoc?: string;
}

interface contdProp {
  docp: DocumentoProps[];
}

export function ContDoc({ docp }: contdProp) {
  // Función para mostrar vista previa según tipo de archivo
  const renderPreview = (doc: DocumentoProps) => {
    if (!doc.arcdoc) return null;
    const ext = doc.arcdoc.split('.').pop()?.toLowerCase();
    if (ext === "pdf") {
      return (
        <iframe
          src={doc.arcdoc}
          class="w-full h-32 rounded mb-2 bg-white"
          title="Vista previa PDF"
        />
      );
    }
    if (ext === "awg" || ext === "dwg") {
      return (
        <div class="w-full h-32 flex items-center justify-center bg-gray-100 rounded mb-2 text-gray-600 text-xs">
          Vista previa no disponible<br />({ext?.toUpperCase()})
        </div>
      );
    }
    return (
      <div class="w-full h-32 flex items-center justify-center bg-gray-100 rounded mb-2 text-gray-600 text-xs">
        Vista previa no disponible<br />({ext?.toUpperCase()})
      </div>
    );
  };

  // Función para descargar el archivo usando fetch
  const descargarArchivo = async (doc: DocumentoProps) => {
    if (!doc.arcdoc) return;
    try {
      const response = await fetch(doc.arcdoc);
      if (!response.ok) throw new Error("No se pudo descargar el archivo");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.nomdoc || "documento";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error al descargar el archivo");
    }
  };

  return (
    <div class="w-full overflow-x-auto p-4">
      <div class="flex flex-row gap-4 py-2 min-w-max">
        {docp.map((doc) => (
          <div
            key={doc.id}
            class="min-w-[240px] max-w-xs bg-[#e4c36f] rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col items-start transition-transform hover:scale-105"
          >
            {renderPreview(doc)}
            <div class="font-bold text-base mb-1 text-[#393a44]">{doc.nomdoc}</div>
            <div class="text-xs text-gray-700 mb-1">Tipo: {doc.tipdoc}</div>
            <div class="text-xs text-gray-500 mb-1">Publicado: {doc.pubdoc}</div>
            <a
              href={doc.arcdoc}
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2 text-blue-700 hover:underline text-sm font-semibold"
              download
            >
              Ver/Descargar archivo
            </a>
            <button
              type="button"
              class="mt-2 px-3 py-1 bg-[#393a44] text-white rounded hover:bg-[#222] text-xs"
              onClick={() => descargarArchivo(doc)}
            >
              Descargar directo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}