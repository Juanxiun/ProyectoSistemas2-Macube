import { useEffect, useState } from "preact/hooks/";
import { setLoadScreen } from "../../lib/utils/displayLoad.ts";
import { ModalDocumento } from "../../components/Modal/modalDocumento.tsx";
import { ContDoc } from "../../components/Element/contDoc.tsx";
import { fetchData } from "../../lib/utils/metodos/fetchHelper.ts";
import { CartUI } from "../../components/UI/cartUI.tsx";

export default function CartDocumento({ proyid, edit }: cartDocumentoProp) {
  const [documentos, setDocumentos] = useState<DocumentoProps[]>([]);
  const [act, setAct] = useState(false);
  const [edt, setEdt] = useState(false);
  const [load, setLoad] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState<
    DocumentoProps | null
  >(null);
  const [docID, setDocID] = useState<string>("");

  useEffect(() => {
    const fetchProy = async () => {
      setLoad(true);
      setCompleted(false);
      const result = await fetchData<{ result: DocumentoProps[] }>(
        `/api/proyApi/proyDRes?idproy=${proyid}`,
        {},
        () => {},
      );
      if (result?.result) {
        setDocumentos(result.result);
      }
      setLoad(false);
      setCompleted(true);
      setLoadScreen(false);
      setTimeout(() => setCompleted(false), 2000);
    };
    setLoadScreen(true, "Cargando datos del proyecto");
    fetchProy();
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
      setLoadScreen(false);
      alert("El archivo supera el límite de 100 MB.");
      return;
    }
    setLoadScreen(
      true,
      `Cargando archivo ${file?.name ?? ""}, no salga de la página...`,
    );

    try {
      const res = await fetch(
        `/api/proyApi/proyDRes?idproy=${docID ? docID : proyid}`,
        {
          method: metodo,
          body: formData,
        },
      );
      const data = await res.json();
      if (res.status === 200) {
        setLoadScreen(
          true,
          `${data.message} Documento ${
            metodo === "POST" ? "creado" : "actualizado"
          }. La página se recargará`,
        );
        setTimeout(() => {
          setLoadScreen(false);
          globalThis.location.reload();
        }, 2500);
      } else {
        setLoadScreen(false);
        alert(data.message);
      }
    } catch (error) {
      setLoadScreen(false);
      console.log(error);
      alert(`Error encontrado ${error}`);
    } finally {
      setAct(false);
    }
  };

  return (
    <CartUI
      onclick={handlerNewDocumento}
      titulo="Documento"
      edit={edit}
      styleCLS="proycart_main2"
    >
      <ContDoc docp={documentos} />

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
            {selectedDocumento ? "Actualizar" : "Crear"} Documento
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
    </CartUI>
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
  edit: boolean;
}
