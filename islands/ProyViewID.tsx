import { useEffect, useState } from "preact/hooks";
import { MOD_PROYECTOS } from "../lib/database/models/proyectos/proyectoModel.ts";
import { TitleComp } from "../components/TitleComp.tsx";

export function ProyViewID({ id }: { id: number }) {
  const [activar, setActivar] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    cicli: 0,
    codearq: "",
    nombre: "",
    tipo: "",
    inicio: "",
    habilitado: 1,
  });

  useEffect(() => {
    fetch(`/api/ProyApi/proyectos?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setFormData({
            id: id,
            cicli: 76789876,
            codearq: "JA77JU14",
            nombre: data[0].nombre || "",
            tipo: data[0].tipo || "",
            inicio: data[0].inicio ? new Date(data[0].inicio).toISOString().slice(0, 16) : "",
            habilitado: data[0].habilitado || 1,
          });
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, [id]);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/ProyApi/proyectos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al actualizar proyecto");
      alert("Proyecto actualizado con éxito");
      setActivar(false); // Desactiva la edición después de guardar
    } catch (error) {
      console.error("Update error:", error);
      alert("Error al actualizar proyecto");
    }
  };

  return (
    <article className="proy-view-id">
      <form onSubmit={handleSubmit}>
        <div className="proy-view-id-item">
          <TitleComp title="DATOS DE PROYECTOS" styleCls="proy-id-title-main" />
          <button
            type="button"
            onClick={() => setActivar(!activar)}
            className="proy-view-id-edit"
          >
            {activar ? "CANCELAR EDICIÓN" : "EDITAR"}
          </button>

          <div className="proy-view-id-item-internal">
            <label>TÍTULO:</label>
            <input
              type="text"
              className="proy-cart-cont-inpt"
              name="nombre"
              value={formData.nombre}
              onInput={handleChange}
              readOnly={!activar}
            />
          </div>

          <div className="proy-view-id-item-internal">
            <label>TIPO:</label>
            {activar ? (
              <select
                name="tipo"
                className="rounded-3xl my-3 py-2 w-1/2 px-3 text-xl bg-white/20 text-black"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="">NO DEFINIDO</option>
                <option value="proyecto">PROYECTO</option>
                <option value="planimetria">PLANIMETRIA</option>
                <option value="inspeccion">INSPECCIÓN</option>
              </select>
            ) : (
              <input
                type="text"
                className="proy-cart-cont-inpt"
                value={formData.tipo}
                readOnly
              />
            )}
          </div>

          <div className="proy-view-id-item-internal">
            <label>INICIO:</label>
            <input
              type="datetime-local"
              className="proy-cart-cont-inpt"
              name="inicio"
              value={formData.inicio}
              onInput={handleChange}
              readOnly={!activar}
            />
          </div>

          {!activar && (
            <div className="proy-view-id-item-internal">
              <label>ESTADO:</label>
              <select
                name="habilitado"
                className="proy-cart-cont-inpt"
                value={formData.habilitado}
                onChange={handleChange}
                disabled={!activar}
              >
                <option value="1">EN PROCESO</option>
                <option value="0">ACABADO</option>
              </select>
            </div>
          )}

          {activar && (
            <button type="submit" className="proy-view-item-bt">
              GUARDAR CAMBIOS
            </button>
          )}
        </div>
      </form>
    </article>
  );
}
