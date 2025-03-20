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
      <div class="mb-4">
        <input
          type="number"
          name="ci"
          placeholder="Cédula de Identidad"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <input
          type="text"
          name="extension"
          placeholder="Extensión (ej: LP, CB, SC)"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <input
          type="number"
          name="telefono"
          placeholder="Teléfono"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <input
          type="number"
          name="telefono2"
          placeholder="Teléfono 2 (opcional)"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-4">
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico (opcional)"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-4">
        <input
          type="password"
          name="pass"
          placeholder="Contraseña"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}