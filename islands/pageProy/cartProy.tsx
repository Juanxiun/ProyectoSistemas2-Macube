import { useEffect, useState } from "preact/hooks/";
import { setMessage } from "../../lib/message/metodosMsg.ts";
import { CartPElement } from "../../components/Element/cartProyEl.tsx";


interface proyProp {
  id: string;
  arq: string;
  cli: string;
  nomproy: string;
  tipproy: string;
  iniproy: Date;
  preproy: string;
  depproy: string;
  dirproy: string;
  imgproy: string;
}

export default function CartProy() {
  const [proy, setProy] = useState<proyProp[]>([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch(`/api/proyApi/proyRest`);
        const result = await res.json();

        if (res.status === 200 && result.result) {
          setProy(result.result);
        } else if (result.message) {
          setMessage("alerta", result.message);
        }
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
        setMessage("error", "Error al cargar los proyectos.");
      } finally {
        setLoad(false);
      }
    };
    fetchProyectos();
  }, []);

  if (load) {
    return <p>Cargando proyectos...</p>;
  }

  const handlerRedirect = (id: string) => {
    globalThis.location.href = `/proyecto/detalles/${id}`;
  };

  return (
    <div
      className={containerStyle +
        ` justify-between align-middle`}
    >
      {proy.map((p) => (
        <div
          onClick={() => {
            handlerRedirect(p.id);
          }}
          key={p.id}
          className={cardStyle + ` w-full h-[450px] cursor-pointer`}
        >
          <CartPElement
            nomproy={p.nomproy}
            tipproy={p.tipproy}
            iniproy={p.iniproy}
            preproy={p.preproy}
            depproy={p.depproy}
            imgproy={p.imgproy}
          />
        </div>
      ))}
    </div>
  );
}

const containerStyle =
  "w-full h-full flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4";
const cardStyle =
  " bg-[#393a44] text-[#c7c7c7] shadow-xl rounded-2xl overflow-hidden border-8 border-[#393a44] transition-transform transform hover:scale-105 hover:shadow-2xl";
