import { ListUI } from "../UI/ListUI.tsx";

interface SiderProps {
  view: boolean;
  isAllow: boolean;
}

export default function SiderBar(
  { view, isAllow }: SiderProps,
) {
  return (
    <aside class="siderbar">
      
      <div>
        <img class="siderbar_logo" src="/logo.svg" alt="" />
        <h1 class="siderbar_tit">MACUBE</h1>
      </div>

      <div class="siderbar_list">
        {isAllow
          ? (
            <>
              <ListUI
                titulo="Proyectos"
                icono="/assets/sider/list.svg"
                lis={[
                  ...(
                    view
                      ? [{ titulo: "Registrar", url: "/proyecto/registro" }]
                      : []
                  ),
                  { titulo: "Listar", url: "/proyecto/" },
                ]}
              />

              <ListUI
                titulo="Apartados"
                icono="/assets/sider/llam.svg"
                lis={[
                  { titulo: "Documentos", url: "/proyecto/documento" },
                  { titulo: "Fases", url: "/proyecto/fase" },
                  { titulo: "Inspecciones", url: "/proyecto/inspeccion" },
                  { titulo: "Pagos", url: "/proyecto/pago" },
                ]}
              />

              <ListUI
                titulo="Adicional"
                icono="/assets/sider/esta.svg"
                lis={[
                  { titulo: "Contactos", url: "/usuario/contactos" },
                  { titulo: "Estadisticas", url: "/proyecto/estadistica" },
                  { titulo: "Nek1to", url: "/afuera/nek1to/" },
                ]}
              />
            </>
          )
          : ("")}
      </div>
    </aside>
  );
}
