import EstructuraPageMain from "../../../islands/pages/estructura.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import ReporteSaldo from "../../../islands/reportes/saldo.reporte.tsx";
import ReporteFase from "../../../islands/reportes/fase.reporte.tsx";
import ReporteDepartamento from "../../../islands/reportes/dep.reporte.tsx";
import ReporteTipo from "../../../islands/reportes/tipo.reporte.tsx";
import DescargaReporte from "../../../islands/reportes/des.reporte.tsx";

type CookieData = {
  codigo: string;
  isAllow: boolean;
  rol: string;
  nombre: string;
};

export const handler: Handlers<CookieData> = {
  async GET(req, ctx) {
    const res = await fetch(`${ctx.url.origin}/api/cookieGet`, {
      headers: req.headers,
    });
    const data = await res.json();
    return ctx.render(data);
  },
};

export default function ReportesHome({ data }: PageProps<CookieData>) {
  return (
    <EstructuraPageMain
      page="other"
      nombre={data.nombre}
      isAllow={data.isAllow}
      rol={data.rol}
      codigo={data.codigo}
    >
      <div class="w-full h-full px-2 py-4">
        <h1 class="text-2xl font-bold mb-6 text-center text-[#658895]">Reportes de Proyectos</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div class="bg-white rounded-xl shadow">
            <ReporteSaldo arq={data.codigo} />
          </div>
          <div class="bg-white rounded-xl shadow">
            <ReporteFase arq={data.codigo} />
          </div>
          <div class="bg-white rounded-xl shadow">
            <ReporteDepartamento arq={data.codigo} />
          </div>
          <div class="bg-white rounded-xl shadow">
            <ReporteTipo arq={data.codigo} />
          </div>
        </div>
        <div class="h-[100px] w-full my-4 flex justify-center align-middle items-center">

          <DescargaReporte arq={data.codigo} nombre={data.nombre}/>

        </div>
      </div>
    </EstructuraPageMain>
  );
}