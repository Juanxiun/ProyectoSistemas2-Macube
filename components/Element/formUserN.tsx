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
  }: userProps,
) {
  return (
    <>
      <div class="UserForm">
        <InputUI
          id="codigo"
          titulo={codigo ? "codigo" : ""}
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
          titulo="ci"
          tipo="number"
          valor={ci ?? ""}
          noEdit
          necesario
          classCLS="inptRegistro"
        />

        <SelectUI
          id={ci ? "" : "extension"}
          titulo="extension"
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
          escala="1/4"
          classCLS=""
        />
        <input
          type="hidden"
          value={extension}
          name={ci ? "extension" : "xd"}
          id={ci ? "extension" : "xd"}
        />
      </div>

      <div class="UserForm">
        <InputUI
          id="nombre"
          titulo="nombre"
          tipo="text"
          valor={nombre ?? ""}
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />

        <InputUI
          id="apellido"
          titulo="apellido"
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
            titulo="departamento"
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
                { text: "LA PAZ", valor: "LAPAZ" },
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
            id={ci ? "departamento" : "xd1"}
            name={ci ? "departamento" : "xd1 "}
          />

          <InputUI
            id="direccion"
            titulo="direccion"
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
          titulo="telefono"
          tipo="number"
          valor={telefono?.toString() ?? ""}
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />

        <InputUI
          id="correo"
          titulo="correo"
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
          titulo={ci? " " : "contraseña"}
          tipo={ci? "hidden" : "password"}
          valor=""
          noEdit={noedit}
          necesario
          classCLS="inptRegistro"
        />

        <InputUI
          id="contra_conf"
          titulo={ci? " " : "contraseña"}
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
