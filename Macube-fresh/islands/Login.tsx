import { useState } from "preact/hooks";

export default function Login() {  
  const [ci, setci] = useState("");
  const [pass, setPass] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    const res = await fetch("/api/login", {
      method: "POST",
      body: new URLSearchParams({ ci, pass }),
    });

    const data = await res.json();

    if (data.success) {
      setMensaje("✅ Login exitoso");
      setTimeout(() => window.location.href = "/dashboard", 1000);
    } else {
      setMensaje(`❌ ${data.error}`);
    }
  }

  return (
    <div class="">
      

      {/* Sección del login centrado */}
      <div class="">
        <div class="">
          
          <form onSubmit={handleSubmit} class="flex flex-col gap-4">
            <input
              type="number"
              value={ci}
              onInput={(e) => setci(e.currentTarget.value)}
              placeholder="CI"
              required
              class="p-2 border rounded w-full"
            />
            <input
              type="password"
              value={pass}
              onInput={(e) => setPass(e.currentTarget.value)}
              placeholder="Contraseña"
              required
              class="p-2 border rounded w-full"
            /> 
            <button 
              type="submit"
              class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
              Iniciar sesión
            </button>
            {mensaje && <p class="text-red-500 text-center">{mensaje}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
