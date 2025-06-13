import { ListUI } from "../UI/ListUI.tsx";

interface SiderProps {
  view: boolean;
  isAllow: boolean;
  userID: string;
}

export default function SiderBar(
  { view, isAllow, userID }: SiderProps,
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
                titulo="Utilidades"
                icono="/assets/sider/esta.svg"
                lis={[
                  { titulo: "Contactos", url: "/usuario/contactos" },
                  { titulo: "Reportes", url: "/proyecto/reportes" },
                  { titulo: "Solicitudes", url: "/proyecto/inspeccion" },
                  { titulo: "", url: "/proyecto/pago" },
                ]}
              />

              <ListUI
                titulo="Ajustes"
                icono="/assets/sider/user.svg"
                lis={[
                  { titulo: "Cuenta", url: `/usuario/${userID}` },
                  { titulo: "Cerrar", url: "/sesion/logout/" },
                ]}
              />
            </>
          )
          : ("")}
      </div>
    </aside>
  );
}
