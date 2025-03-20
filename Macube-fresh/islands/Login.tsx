import { useState } from "preact/hooks";

export default function Login() {  
  const [ci, setci] = useState("");
  const [pass, setPass] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    const res = await fetch("/api/session", {
      method: "POST",
      body: new URLSearchParams({ ci, pass }),
    });

    const data = await res.json();

    if (data.success) {
      setMensaje("✅ Login exitoso");
      setTimeout(() => globalThis.location.href = "/", 1000);
    } else {
      setMensaje(`❌ ${data.error}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} class="flex flex-col gap-2">
      <input
        type="number"
        value={ci}
        onInput={(e) => setci(e.currentTarget.value)}
        placeholder="ci"
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
