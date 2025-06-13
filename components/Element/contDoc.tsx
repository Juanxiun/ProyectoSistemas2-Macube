import { DescargaArc } from "../../lib/utils/descargaArc.ts";

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

    const match = doc.arcdoc.match(/^data:(.*?);base64,/);
    const mimeType = match?.[1] || "";

    if (mimeType === "application/pdf") {
      return (
        <img
          src="/assets/carts/pdf.svg"
          alt="Vista previa no disponible"
          className="w-full h-full rounded"
        />
      );
    } else if (
      mimeType === "application/vnd.dwg" || mimeType === "application/acad" ||
      mimeType === "application/octet-stream"
    ) {
      return (
        <img
          src="/assets/carts/arch.svg"
          alt="Vista previa no disponible"
          className="w-full h-full rounded"
        />
      );
    } else {
      return (
        <img
          src="/assets/carts/arch.svg"
          alt="Vista previa no disponible"
          className="w-full h-full rounded"
        />
      );
    }
  };

  // Función para descargar el archivo usando fetch
  const handleDescargaDirecta = (doc: DocumentoProps) => {
    DescargaArc(doc);
  };

  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="flex flex-row gap-4 py-2 min-w-max">
        {docp.map((doc) => (
          <div
            key={doc.id}
            className="w-[350px] h-[300px] flex flex-col align-middle items-center bg-[#e4c36f] rounded-lg p-4 transition-transform hover:scale-105"
          >
            <div class="w-[full] h-[50%] flex justify-center align-middle items-center p-4 bg-white rounded-lg">
              {renderPreview(doc)}
            </div>
            <div class="h-full w-full">
              <div className="font-bold text-xl text-center mb-1 text-[#393a44]">
                {doc.nomdoc?.toUpperCase()}
              </div>

              <div class="w-full flex flex-row justify-between align-middle items-center">
                <div className="text-lg text-gray-700 mb-1">
                  <h3>Tipo:</h3>
                  <p>{doc.tipdoc}</p>
                </div>
                <div className="text-lg text-gray-700 mb-1">
                  <h3>Publicado:</h3>
                  <p>
                    {new Date(doc.pubdoc ?? "").getFullYear()}-{new Date(
                      doc.pubdoc ?? "",
                    ).getMonth()}-{new Date(doc.pubdoc ?? "").getDay()}
                  </p>
                </div>
              </div>

              <div class="w-full flex justify-center align-middle items-center">
                <button
                  type="button"
                  className="mt-2 px-3 py-1 bg-[#393a44] text-white rounded hover:bg-[#222] text-lg"
                  onClick={() => handleDescargaDirecta(doc)}
                >
                  Descargar archivo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
