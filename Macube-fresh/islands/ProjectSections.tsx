import { useSignal } from "@preact/signals";
import { FunctionComponent } from "preact";

const ProjectSections: FunctionComponent = () => {
  const showProyectos = useSignal(false);
  const showEnProceso = useSignal(false);
  const showTerminados = useSignal(false);

  return (
    <div class="space-y-4">
      {/* Proyectos */}
      <div>
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded w-full text-left"
          onClick={() => showProyectos.value = !showProyectos.value}
        >
          📂 Proyectos
        </button>
        {showProyectos.value && (
          <div class="p-2 border rounded mt-2 bg-gray-100">
            <p>aun no hay proyectos</p>
          </div>
        )}
      </div>

      {/* Proyectos en Proceso */}
      <div>
        <button 
          class="bg-yellow-500 text-white px-4 py-2 rounded w-full text-left"
          onClick={() => showEnProceso.value = !showEnProceso.value}
        >
          🔄 Proyectos en Proceso
        </button>
        {showEnProceso.value && (
          <div class="p-2 border rounded mt-2 bg-gray-100">
            <p>aun no hay proyectos..</p>
          </div>
        )}
      </div>

      {/* Proyectos Terminados */}
      <div>
        <button 
          class="bg-green-500 text-white px-4 py-2 rounded w-full text-left"
          onClick={() => showTerminados.value = !showTerminados.value}
        >
          ✅ Proyectos Terminados
        </button>
        {showTerminados.value && (
          <div class="p-2 border rounded mt-2 bg-gray-100">
            <p>aun no hay proyectos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSections;
