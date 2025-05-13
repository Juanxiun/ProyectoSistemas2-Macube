import { useEffect, useState } from "preact/hooks/";
import { delMessage, getMessage } from "../../lib/message/metodosMsg.ts";

export default function MessagesAlert() {
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      const msj = await getMessage();
      setMensaje((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(msj)) {
          return JSON.stringify(msj);
        }
        return prev;
      });
      setTipo((prev) => {
        if (msj && msj.tipo !== prev) {
          return msj.tipo;
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const dropMessage = () => {
    delMessage();
    setMensaje("");
  };

  return (
    <div onClick={dropMessage}>
      {mensaje && (
        <div className="fixed top-4 left-0 right-0 z-50 p-4 py-2 mx-5">
          <div
            className={`
              ${tipo === "error" && "bg-red-500 text-white"} 
              ${tipo === "completado" && "bg-green-400 text-white"} 
              ${tipo === "alerta" && "bg-blue-400 text-white"} 
              text-xl p-4 rounded-lg shadow-md
              w-full flex flex-row justify-start align-middle items-center
              space-x-3`}
          >
            <img className={`w-12 h-12`} src="/favicon/danger.svg" alt="xd" />
            <p>{JSON.parse(mensaje).contx}</p>
          </div>
        </div>
      )}
    </div>
  );
}
