import { useState } from "preact/hooks";

export default function FormularioRegistro() {
  const [ci, setCi] = useState("");
  const [extension, setExtension] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(event : Event) {
    event.preventDefault();

    const formData = new URLSearchParams({
      ci, extension, nombres, apellidos, telefono, telefono2, correo, pass
    });

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const data = await res.json();

      if (data.success) {
        setMensaje("✅ Registro exitoso");
        setTimeout(() => globalThis.location.href = "/", 1000);
      } else {
        console.log(data.error);
        setMensaje(`❌ ${data.error}`);
      }
    } catch (_error) {
      console.log(_error)
      setMensaje('❌ Error en el registro');
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {mensaje && <p>{mensaje}</p>}
      {/*Manejo de carnetss*/}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Cédula de Identidad:
        </label>
        <input
          type="number"
          name="ci"
          value={ci}
          onInput={(e) => setCi(e.currentTarget.value)}
          placeholder="12345678"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/*Manejo de extension de carnets*/}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Extensión:
        </label>
        <select
          name="extension"
          value={extension}
          onInput={(e) => setExtension(e.currentTarget.value)}
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccione una extensión</option>
          <option value="LP">La Paz (LP)</option>
          <option value="SC">Santa Cruz (SC)</option>
          <option value="CB">Cochabamba (CB)</option>
          <option value="OR">Oruro (OR)</option>
          <option value="PT">Potosí (PT)</option>
          <option value="TJ">Tarija (TJ)</option>
          <option value="CH">Chuquisaca (CH)</option>
          <option value="BN">Beni (BN)</option>
          <option value="PD">Pando (PD)</option>
        </select>
      </div>
      {/*Manejo de los nombres*/}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Nombres:
        </label>
        <input
          type="text"
          name="nombres"
          value={nombres}
          onInput={(e) => setNombres(e.currentTarget.value)}
          placeholder="Ingrese sus nombres"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/*Manejo de los apellidos */}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Apellidos:
        </label>
        <input
          type="text"
          name="apellidos"
          value={apellidos}
          onInput={(e) => setApellidos(e.currentTarget.value)}
          placeholder="Ingrese sus apellidos"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/*Manejo del teléfono de clientes*/}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Teléfono:
        </label>
        <input
          type="number"
          name="telefono"
          value={telefono}
          onInput={(e) => setTelefono(e.currentTarget.value)}
          placeholder="Ingrese su teléfono"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/*Manejo de segudndo telefono de clientes (cel´?)*/}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Teléfono 2 (opcional):
        </label>
        <input
          type="number"
          name="telefono2"
          value={telefono2}
          onInput={(e) => setTelefono2(e.currentTarget.value)}
          placeholder="Ingrese un segundo teléfono"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/*Manejo del correo electronico*/}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Correo electrónico (opcional):
        </label>
        <input
          type="email"
          name="correo"
          value={correo}
          onInput={(e) => setCorreo(e.currentTarget.value)}
          placeholder="cliente@gmail.com"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/*Manejo de la contraseña*/}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Contraseña:
        </label>
        <input
          type="password"
          name="pass"
          value={pass}
          onInput={(e) => setPass(e.currentTarget.value)}
          placeholder="password"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/*Boton de registro*/}

      <button type="submit">REGISTRATE</button>
    </form>
  );
}
