import { useState } from "preact/hooks/";
import { InputElement } from "../../components/element/InputElement.tsx";
import { MessageElement } from "../../components/element/MessageElement.tsx";
import { TitleComp } from "../../components/ui/TitleComp.tsx";

export function RegisterForm() {
  const [msj, setMsj] = useState<string>("");

  const handlerSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/session/registro/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      setMsj("GRACIAS POR REGISTRARSE. espere mientras iniciamos sesion...");
      setTimeout(() => globalThis.location.href = "/", 1500);
    } catch (error) {
      setMsj(
        `Error. ${error instanceof Error ? error.message : " desconocido"}`,
      );
    }
  };

  return (
    <div className={`h-full w-1/2`}>
      <div class="message">
        {msj &&
          (
            <MessageElement
              message={msj}
              typeM={msj.includes("GRACIAS") ? true : false}
            />
          )}
      </div>
      <form onSubmit={handlerSubmit} class="registro-form">
        <div class="registro-form-cont-data">
          <TitleComp title="REGISTRO" styleCls="registro-title" />
          <div class="registro-form-cap">
            <InputElement
              tipo="number"
              titulo="carnet de identidad (CI):"
              id="ci"
              requerido
            />
            <div class="Input-Elm">
              <label htmlFor="extension">Extensión:</label>
              <select
                name="extension"
                id="extension"
                required
              >
                <option value="">Seleccione...</option>
                <option value="LP">La Paz</option>
                <option value="SC">Santa Cruz</option>
                <option value="CB">Cochabamba</option>
                <option value="OR">Oruro</option>
                <option value="PT">Potosí</option>
                <option value="TJ">Tarija</option>
                <option value="CH">Chuquisaca</option>
                <option value="BN">Beni</option>
                <option value="PD">Pando</option>
              </select>
            </div>
          </div>

          <div class="registro-form-cap">
            <InputElement
              tipo="text"
              titulo="nombre / nombres:"
              id="nombre"
              requerido
            />

            <InputElement
              tipo="text"
              titulo="apellidos:"
              id="apellido"
              requerido
            />
          </div>

          <div class="registro-form-cap">
            <InputElement
              tipo="number"
              titulo="telefono principal:"
              id="telefono1"
              requerido
            />
            <InputElement
              tipo="number"
              titulo="telefono secundario:"
              id="telefono2"
              requerido={false}
            />
          </div>

          <div class="registro-form-cap">
            <InputElement
              tipo="email"
              titulo="correo electronico:"
              id="email"
              requerido
            />
            <InputElement
              tipo="password"
              titulo="contraseña:"
              id="pass"
              requerido={false}
            />
          </div>

          <div>
            <InputElement
              tipo="text"
              titulo="direccion"
              id="direccion"
              requerido
            />
          </div>

          <button class="registro-form-cont-btn" type="submit">
            REGISTRAR
          </button>
        </div>
      </form>
    </div>
  );
}
