import { useState } from "preact/hooks";

export default function FormularioRegistro() {
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
  
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error en el registro");
      }

      setMensaje("✅ Registro exitoso. Redirigiendo...");
      setTimeout(() => globalThis.location.href = "/", 1500);
    } catch (error) {
      setMensaje(`❌ ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      {mensaje && (
        <div class={`p-3 rounded-md ${
          mensaje.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {mensaje}
        </div>
      )}

      <div class="space-y-4">
        {/* CI */}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cédula de Identidad *
          </label>
          <input
            type="number"
            name="ci"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Extensión */}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Extensión *
          </label>
          <select
            name="extension"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Nombres y Apellidos */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombres *
            </label>
            <input
              type="text"
              name="nombres"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Apellidos *
            </label>
            <input
              type="text"
              name="apellidos"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Teléfonos */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              name="telefono"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Teléfono secundario
            </label>
            <input
              type="tel"
              name="telefono2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Correo y Contraseña */}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            name="correo"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña *
          </label>
          <input
            type="password"
            name="pass"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-fulls bg-slate-700 hover:bg-slate-500-300 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 transition-colors"
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}