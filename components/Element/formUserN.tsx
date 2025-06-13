import { InputUI } from "../UI/InputUI.tsx";
import { SelectUI } from "../UI/SelectUI.tsx";

interface userProps {
  codigo?: string;
  ci?: string;
  extension?: string;
  nombre?: string;
  apellido?: string;
  departamento?: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
  noedit: boolean;
  page?:boolean;
}

export function FormUserElement(
  {
    codigo,
    ci,
    extension,
    nombre,
    apellido,
    departamento,
    direccion,
    telefono,
    correo,
    noedit,
    page,
  }: userProps,
) {
  return (
    <>
      <div class="UserForm">
        <InputUI
          id="codigo"
          titulo={codigo ? "Codigo" : ""}
          tipo={codigo ? "text" : "hidden"}
          valor={codigo ?? ""}
          noEdit
          necesario
          classCLS="InptRegistro"
        />
      </div>

      <div class="UserForm">
        <InputUI
          id="ci"
          titulo="Ci"
          tipo="number"
          valor={ci ?? ""}
          noEdit={page?? true}
          necesario
          classCLS="inptRegistro"
        />

        <SelectUI
          id={ci ? "" : "extension"}
          titulo="Extension"
          desactivar={ci ? true : false}
          opciones={[
            ...(extension
              ? [
                {
                  text: extension,
                  valor: extension,
                },
              ]
              : []),
            ...[
              { text: "PD", valor: "PD" },
              { text: "LP", valor: "LP" },
              { text: "CB", valor: "CB" },
              { text: "OR", valor: "OR" },
              { text: "TJ", valor: "TJ" },
              { text: "BN", valor: "BN" },
              { text: "PT", valor: "PT" },
              { text: "SC", valor: "SC" },
              { text: "CH", valor: "CH" },
            ].filter((op) => op.valor !== extension),
          ]}
          escala="1/2"
          classCLS=""
        />
        <input
          type="hidden"
          value={extension}
          name={ci ? "Extension" : "xd"}
          id={ci ? "extension" : "xd"}
        />
      </div>

      <div class="UserForm">
        <InputUI
          id="nombre"
          titulo="Nombre"
          tipo="text"
          valor={nombre ?? ""}
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />

        <InputUI
          id="apellido"
          titulo="Apellido"
          tipo="text"
          valor={apellido ?? ""}
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />
      </div>

      {codigo && codigo?.length > 0 ? ("") : (
        <div class="UserForm">
          <SelectUI
            id={ci ? "" : "departamento"}
            titulo="Departamento"
            desactivar={ci ? true : false}
            opciones={[
              ...(departamento
                ? [
                  {
                    text: departamento,
                    valor: departamento,
                  },
                ]
                : []),
              ...[
                { text: "PANDO", valor: "PANDO" },
                { text: "LA PAZ", valor: "LA PAZ" },
                { text: "COCHABAMBA", valor: "COCHABAMBA" },
                { text: "ORURO", valor: "ORURO" },
                { text: "TARIJA", valor: "TARIJA" },
                { text: "BENI", valor: "BENI" },
                { text: "POTOSI", valor: "POTOSI" },
                { text: "SANTA CRUZ", valor: "SANTACRUZ" },
                { text: "CHUQUISACA", valor: "CHUQUISACA" },
              ].filter((op) => op.valor !== departamento),
            ]}
            escala="2/3"
            classCLS=""
          />
          <input
            type="hidden"
            value={noedit ? departamento : ""}
            id={ci ? "Departamento" : "xd1"}
            name={ci ? "departamento" : "xd1 "}
          />

          <InputUI
            id="direccion"
            titulo="Direccion"
            tipo="text"
            valor={direccion ?? ""}
            noEdit={noedit}
            necesario
            classCLS="inptRegistro"
          />
        </div>
      )}

      <div class="UserForm">
        <InputUI
          id="telefono"
          titulo="Telefono"
          tipo="number"
          valor={telefono?.toString() ?? ""}
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />

        <InputUI
          id="correo"
          titulo="Correo"
          tipo="email"
          valor={correo ?? ""}
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />
      </div>

      <div class="UserForm">
        <InputUI
          id="contra"
          titulo={ci? " " : "Contraseña"}
          tipo={ci? "hidden" : "password"}
          valor=""
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />

        <InputUI
          id="contra_conf"
          titulo={ci? " " : "Contraseña"}
          tipo={ci? "hidden" : "password"}
          valor=""
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />
      </div>
    </>
  );
}
