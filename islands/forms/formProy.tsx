import { useEffect, useState } from "preact/hooks/";
import { FormProyN } from "../../components/Element/formProyN.tsx";
import { InputUI } from "../../components/UI/InputUI.tsx";
import { setMessage } from "../../lib/message/metodosMsg.ts";

interface Props {
  proy?: string;
  arq: string;
  page: "edt" | "new";
}

interface proyProps {
  id: string;
  arq?: string;
  cli?: string;
  nomproy?: string;
  tipproy?: string;
  iniproy?: Date;
  preproy?: string;
  depproy?: string;
  dirproy?: string;
  imgproy?: string;
}

export default function FormProy({ proy, arq, page }: Props) {
  const [proyD, setProyD] = useState<proyProps[]>([]);
  const [preImg, setPreImg] = useState<string>("");
  const [des, setDes] = useState<boolean>(false);

  //console.log(proy);
  useEffect(() => {
    setDes(() => page === "new" ? false : page === "edt" ? true : false);
  }, [page]);

  //obtener clientes
  useEffect(() => {
    try {
      const fetchProy = async () => {
        if (proy && proy?.length > 0) {
          const res = await fetch(`/api/proyApi/proyRest?id=${proy}`);
          if (!res.ok) throw new Error("Error al obtener datos");
          const pro = await res.json();
          console.log(pro.result);

          setProyD(pro.result);
        }
      };

      fetchProy();
    } catch (error) {
      console.log("ERROR al registrar proyecto\n", error);
      setMessage("error", "Error al registrar el proyecto.");
    }
  }, [des === true]);

  //obtener imagen preview
  const handleImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreImg(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //registrar proyecto
  const handlerOnSubmit = async (e: Event, metodo: "POST" | "PUT") => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const met = metodo;
      console.log(met);
      const res = await fetch(`/api/proyApi/proyRest?idproy=${proyD[0]?.id}`, {
        method: met,
        body: formData,
      });
      const data = await res.json();
      if (res.status === 400) {
        const errorData = await res.json();
        setMessage("error", errorData.error);
      }
      if (res.status === 200) {
        setMessage("completado", data.message);
      }
      const tipo: string = data.tipo;
      if (tipo.includes("post")) {
        console.log(data.result);
        const idPr = data.result;

        globalThis.location.href = `/proyecto/detalles/${idPr}`;
      }
    } catch (error) {
      console.log("ERROR al registrar proyecto\n", error);
      setMessage("error", `Error al registrar el proyecto. ${error}`);
    }
  };

  return (
    <form
      onSubmit={(e) => handlerOnSubmit(e, proy ? "PUT" : "POST")}
      class="formProyecto relative"
    >
      <h1 class="bg-[#658895]  w-full text-center font-bold text-white text-2xl py-4 rounded-t-xl">
        {proy && proy?.length > 0 ? "Editar Proyecto" : "Registrar Proyecto"}
      </h1>
      {proy && proy?.length > 0 &&
        (
          <div
            onClick={() => {
              setDes((p) => !p);
            }}
            class="bg-white
              z-10
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
        )}
      <div class="formProyecto_cont lg:px-2 md:px-4 px-4">
        <div class="formProyecto_img_main">
          <InputUI
            id="imgproy"
            titulo="imagen"
            tipo={des ? "hidden" : "File"}
            valor={preImg ?? ""}
            noEdit={des}
            necesario
            classCLS=" w-full h-full object-cover rounded-lg"
            onInput={handleImageChange}
          />
          <div class="formProyecto_cont_img">
            <img
              src={preImg || proyD[0]?.imgproy}
              class="w-full h-full object-cover rounded-lg"
              alt=""
            />
          </div>
        </div>

        <input
          type="hidden"
          name="imgproyOld"
          id="imgproyOld"
          value={proyD[0]?.imgproy}
        />
        <div class="formProyecto_cont_form">
          <FormProyN
            des={des}
            cli={proyD[0]?.cli}
            arq={arq}
            nomproy={proyD[0]?.nomproy}
            tipproy={proyD[0]?.tipproy}
            iniproy={proyD[0]?.iniproy}
            preproy={proyD[0]?.preproy}
            depproy={proyD[0]?.depproy}
            dirproy={proyD[0]?.dirproy}
            classInptCLS=" text-[#658895]"
          />
        </div>
      </div>

      {des === false &&
        (
          <div class="formProyecto_cont_btn">
            <button class="formProyecto_btn" type="submit">
              Registrar Proyecto
            </button>
          </div>
        )}
    </form>
  );
}
