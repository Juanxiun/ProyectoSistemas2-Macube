import { useEffect, useState } from "preact/hooks";
import { MOD_PROYECTOS } from "../lib/database/models/proyectos/proyectoModel.ts";

export function ProyViewID({ id }: { id: number }) {
  const [_data, setData] = useState<MOD_PROYECTOS[]>([]);
  useEffect(() => {
    fetch(`/api/ProyApi/proyectos?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  });

  return (
    <article class="artProy-view">
      {_data.map((proy) => (
        <div key={proy.id} className="cart-proy-id">
          <img src="/img/Multimedia.webp" alt={`no encontrado ${proy.imagen}`} />

          <div>
            <h1>
              titulo: {proy.nombre}
            </h1>
            <p>
              tipo: {proy.tipo}
            </p>
            <p>
              fecha: {proy.inicio}
            </p>
          </div>
        </div>
      ))}
    </article>
  );
}
