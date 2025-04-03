import { useEffect, useState } from "preact/hooks";
import { MOD_PROYECTOS } from "../lib/database/models/proyectos/proyectoModel.ts";
import { TitleComp } from "../components/TitleComp.tsx";
import { TextComp } from "../components/TextComp.tsx";

export function ProyView() {
  const [_data, setData] = useState<MOD_PROYECTOS[]>([]);

  useEffect(() => {
    fetch("/api/ProyApi/proyectos")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
  }, []);

  const onclickHandler = (id: number) => {
    globalThis.location.href = `/proyectos/list/${id}`;
  };

  console.log(`${_data[0]?.imagen}`);

  return (
    <article className="proy-cart">
      {_data.map((proy) => (
        <div key={proy.id} className="proy-cart-view">
          <div>
            <TitleComp title={proy.nombre} styleCls="proy-cart-title" />
          </div>
          <img class="proy-cart-img" src="/img/Multimedia.webp" alt="" />
          <div class="proy-cart-cont">

            <div class="proy-cart-cont-int">
              <TextComp text={proy.tipo}  styleCls="proy-cart-view-ctx"/>
              <input
                type="datetime"
                class="proy-cart-cont-inpt"
                value={new Date(proy.inicio).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                name="inicio"
                id="inicio"
                readOnly
              />
            </div>

            <button type="button" onClick={() => onclickHandler(proy.id)}>
              VER DETALLES
            </button>

          </div>
        </div>
      ))}
    </article>
  );
}
