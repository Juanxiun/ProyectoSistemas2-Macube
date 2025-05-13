import { useEffect, useState } from "preact/hooks/";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { ModalDocumento } from "../../components/Modal/modalDocumento.tsx";
import { ContDoc } from "../../components/Element/contDoc.tsx";

export default function CartDocumento({ proyid }: cartDocumentoProp) {
  const [documentos, setDocumentos] = useState<DocumentoProps[]>([]);
  const [act, setAct] = useState(false);
  const [edt, setEdt] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState<DocumentoProps | null>(null); 
  const [docID, setDocID] = useState<string>("");

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const res = await fetch(`/api/proyApi/proyDRes?idproy=${proyid}`);
        const result = await res.json();

        if (res.status === 200 && result.data) {
          setDocumentos(result.data);
        } else setMessage("alerta", `${result.message} de documentos`);
      } catch (error) {
        console.log("Error ", error);
        setMessage("error", `Documento, ${error}`);
      }
    };
    fetchDocumentos();
  }, [proyid]);

  const handlerNewDocumento = () => {
    setAct((p) => !p);
    setSelectedDocumento(null); 
  };

  const handleSelectDocumento = (docItem: DocumentoProps) => {
    setSelectedDocumento(docItem);
    setDocID(docItem.id ?? "");
    setAct(true); 
    setEdt(false); 
  };

  const onSubmitDocumento = async (e: Event, metodo: "POST" | "PUT") => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const file = formData.get("arcdoc") as File;
    if (file && file.size > 100 * 1024 * 1024) {
      setMessage("alerta", "El archivo supera el límite de 100 MB.");
      return;
    }

    try {
      const res = await fetch(`/api/proyApi/proyDRes?idproy=${docID ? docID : proyid}`, {
        method: metodo,
        body: formData,
      });
      const data = await res.json();
      if (res.status === 200) {
        setMessage("completado", `${data.message} Documento ${metodo === "POST" ? "creado" : "actualizado"}`);
        setTimeout(() => {
          globalThis.location.reload();
        }, 2500);
      } else {
        setMessage("alerta", data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("error", `Error encontrado ${error}`);
    } finally {
      setAct(false); 
    }
  };

  return (
    <div class="proycart_main">
      <div
        onClick={handlerNewDocumento}
        class="bg-white 
              w-12 h-12 
              rounded-full p-2 
              cursor-pointer 
              absolute right-2 top-2
              flex justify-center 
              align-middle items-center
              hover:bg-[#e4c36f]"
      >
        <img src="/assets/carts/lapiz.svg" height={30} width={30} alt="" />
      </div>
      <div>
        <h1 class="proycart_title">Docuemntos</h1>

        <ContDoc docp={documentos}/>
      </div>
      {act && (
        <form
          onSubmit={(e) => {
            onSubmitDocumento(e, selectedDocumento ? "PUT" : "POST");
          }}
          class="proycart_modal"
        >
          <div onClick={handlerNewDocumento}>
            <span>Cancelar</span>
          </div>
          {selectedDocumento && ( 
            <div onClick={() => setEdt((p) => !p)}>
              <span>Editar</span>
            </div>
          )}
          <h1>
            {selectedDocumento ? "ACTUALIZAR" : "CREAR"} DOCUMENTO
          </h1>

          <ModalDocumento
            nombre={selectedDocumento?.nomdoc || ""}
            tipo={selectedDocumento?.tipdoc || ""}
            archivo={null}
            publicado={selectedDocumento?.pubdoc || ""}
            noEdit={edt}
          />
          <button type="submit">
            {selectedDocumento ? "Actualizar" : "Registrar"}
          </button>
        </form>
      )}
    </div>
  );
}

interface DocumentoProps {
  id?: string;
  proy?: string;
  nomdoc?: string;
  tipdoc?: string;
  arcdoc?: string;
  pubdoc?: string;
}

interface cartDocumentoProp {
  proyid?: string;
}