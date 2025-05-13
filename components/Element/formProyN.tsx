import { useEffect, useState } from "preact/hooks";
import { InputUI } from "../UI/InputUI.tsx";
import { SelectUI } from "../UI/SelectUI.tsx";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { formatTime, getTime } from "../../lib/utils/timeFormat.ts";

interface proyProps {
  des: boolean,
  cli?: string;
  arq?: string;
  nomproy?: string;
  tipproy?: string;
  iniproy?: Date;
  preproy?: string;
  depproy?: string;
  dirproy?: string;

  classInptCLS?: string;
  classSelCLS?: string;
}

interface CliProps {
  ci: number;
  nombre: string;
  apellido: string;
}

export function FormProyN(
  {
    des,
    cli,
    arq,
    nomproy,
    tipproy,
    iniproy,
    preproy,
    depproy,
    dirproy,
    classInptCLS,
    classSelCLS
  }: proyProps,
) {
  const [clientes, setClientes] = useState<CliProps[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/usrApi/userRest");
        const data = await res.json();

        if (res.status === 200 && data.result) {
          setClientes(data.result);
        } else if (data.message) {
          setMessage("alerta", data.message);
        }
      } catch (error) {
        console.error("Error al recuperar clientes:", error);
        setMessage("error", "Error al recuperar el listado de clientes.");
      }
    };

    fetchClientes();
  }, []);

  return (
    <>
      <div class="formProy_cont_dat">
        <InputUI
          id={arq? "" : "arq"}
          titulo="arquitecto"
          tipo="string"
          valor={arq ? arq : ""}
          noEdit
          necesario
          classCLS={classInptCLS}
        />

        <input type="hidden" name="arq" id="arq" value={arq} />
        <input type="hidden" name="cli" id="cli" value={cli} />

        <SelectUI
          id={cli? "" : "cli"}
          titulo="cliente"
          desactivar = {des}
          opciones={[
            ...(cli
              ? clientes
                .filter((c) => `${c.ci}` === `${cli}`)
                .map((c) => ({
                  text: `${c.nombre} ${c.apellido}`,
                  valor: `${c.ci}`,
                }))
              : []),

            ...clientes
              .filter((c) => `${c.ci}` !== `${cli}`)
              .map((c) => ({
                text: `${c.nombre} ${c.apellido}`,
                valor: `${c.ci}`,
              })),
          ]}
          escala="1/2"
          classCLS={classSelCLS}
        />
      </div>

      <div class="formProy_cont_dat">
        <InputUI
          id="nomproy"
          titulo="nombre de proyecto"
          tipo="string"
          valor={nomproy ? nomproy : ""}
          noEdit={des}
          necesario
          classCLS={classInptCLS}
        />

        <SelectUI
          id="tipproy"
          titulo="tipo"
          desactivar={des}
          opciones={[
            {
              text: `${tipproy ? tipproy : "ext"}`,
              valor: `${tipproy ? tipproy : ""}`,
            },
            ...[
              { text: "proyecto", valor: "proyecto" },
              { text: "inspeccion", valor: "inspeccion" },
            ].filter((op) => op.valor !== tipproy),
          ]}
          escala="1/2"
          classCLS={classSelCLS}
        />
      </div>

      <div class="formProy_cont_dat">
        <InputUI
          id="iniproy"
          titulo="fecha de proyecto"
          tipo="datetime-local"
          valor={iniproy ? formatTime(iniproy) : getTime()}
          noEdit
          necesario
          classCLS={classInptCLS}
        />
      </div>

      <div class="formProy_cont_dat">
        <InputUI
          id="preproy"
          titulo="precio del proyecto"
          tipo="number"
          valor={preproy ? preproy : ""}
          noEdit={des}
          necesario
          classCLS={classInptCLS}
        />
      </div>

      <div class="formProy_cont_dat">
        <SelectUI
          id="depproy"
          titulo="."
          desactivar={des}
          opciones={[
            {
              text: `${depproy ? depproy : "ext."}`,
              valor: `${depproy ? depproy : ""}`,
            },
            ...[
              { text: "PANDO", valor: "PANDO" },
              { text: "LA PAZ", valor: "LAPAZ" },
              { text: "COCHABAMBA", valor: "COCHABAMBA" },
              { text: "ORURO", valor: "ORURO" },
              { text: "TARIJA", valor: "TARIJA" },
              { text: "BENI", valor: "BENI" },
              { text: "POTOSI", valor: "POTOSI" },
              { text: "SANTA CRUZ", valor: "SANTACRUZ" },
              { text: "CHUQUISACA", valor: "CHUQUISACA" },
            ].filter((op) => op.valor !== depproy),
          ]}
          escala="2/3"
          classCLS={classSelCLS}
        />
        <InputUI
          id="dirproy"
          titulo="direccion del proyecto"
          tipo="string"
          valor={dirproy ? dirproy : ""}
          noEdit={des}
          necesario
          classCLS={classInptCLS}
        />
      </div>
    </>
  );
}
