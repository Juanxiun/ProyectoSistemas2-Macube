import { useEffect, useState } from "preact/hooks/";

export function ProyView() {
  const [proyecto, setProyecto] = useState([]);

  useEffect(() => {
    const datox = async () => {
      try {
        const res = await fetch("/api/proy/Proy/");
        if (!res.ok) throw new Error("Error al obtener proyectos");
        const proy = await res.json();
        setProyecto(proy);
        console.log(proyecto);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    datox();
    console.log("bienvenido al efecto");
  }, []);

  const handlerOnclick = (id:number) => {
    globalThis.location.href = `/proyectos/${id}`
  }

  return (
    <article class="viewmenu_proy">
      {
        // deno-lint-ignore no-explicit-any
        proyecto.map((p: any) => (
          <div class="viewmenu_proy_cont" key={p.id} onClick={() =>handlerOnclick(p.id)} id={p.id}>
            <img src={`data:image/jpeg;base64,${p.imagen}`} alt="no foto" />
            <div class="viewmenu_proy_data">
              <h1 >{p.nombre}</h1>
              <div class="viewmenu_proy_data_des">
                <p class="uppercase">{p.tipo}</p>
                -
                <p class="font-bold">{p.precio} Bs.</p>
              </div>
              <p class="viewmenu_proy_data_fecha">
                {new Date(p.inicio).getFullYear()}-
                {(new Date(p.inicio).getMonth() + 1).toString().padStart(
                  2,
                  "0",
                )}-
                {new Date(p.inicio).getDate().toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        ))
      }
    </article>
  );
}
