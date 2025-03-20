// islands/FormularioRegistro.tsx
import { useState } from "preact/hooks";

export default function FormularioRegistro() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Registro exitoso");
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el formulario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
            <form onSubmit={handleSubmit}>
        {/*Manejo de carnetss*/}
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
            Cédula de Identidad:
            </label>
            <input
            type="number"
            name="ci"
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
            placeholder="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
        </div>
        {/*Boton de registro*/}
        <button
            type="submit"
            class="w-full bg-[#027A79] text-white py-2 px-4 rounded-md border border-gray-950 hover:bg-[#026663] transition-colors"
            disabled={isSubmitting}
        >
            {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
        </form>
  );
}