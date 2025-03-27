import { useSignal } from "@preact/signals";
import { FunctionComponent } from "preact";

const ModalSettings: FunctionComponent = () => {
  const showModal = useSignal(false);

  return (
    <div class="">
      
      <div class="">
        <button 
          class="bg-gray-700 text-white px-4 py-2 rounded-full"
          onClick={() => showModal.value = !showModal.value}
        >
          ⚙️
        </button>
      </div>

      {/* Modal */}
      {showModal.value && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 class="text-xl font-bold">Configuraciones</h2>
            <p>Aquí puedes cambiar ajustes del dashboard.</p>

            {/* Botón para cerrar */}
            <button 
              class="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => showModal.value = false}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalSettings;
