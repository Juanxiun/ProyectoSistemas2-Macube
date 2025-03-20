import { useState } from "preact/hooks";

export default function Login() {  
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    const res = await fetch("/api/login", {
      method: "POST",
      body: new URLSearchParams({ correo, pass }),
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
    <form onSubmit={handleSubmit} class="flex flex-col gap-2">
      <input
        type="email"
        value={correo}
        onInput={(e) => setCorreo(e.currentTarget.value)}
        placeholder="Correo"
        required
      />
      <input
        type="password"
        value={pass}
        onInput={(e) => setPass(e.currentTarget.value)}
        placeholder="Contraseña"
        required
      /> 
      <button type="submit">Iniciar sesión</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
