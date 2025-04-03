import { Head } from "$fresh/runtime.ts";
import FormularioRegistro from "../islands/FormRegister.tsx";

export default function Registro() {
  return (
    <>
      <Head>
        <title>Registro | MACUBE</title>
        <meta name="description" content="Registro de nuevo cliente" />
      </Head>
      
      <div class="min-h-screen flex flex-col md:flex-row">
        {/* Formulario */}
        <div class="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
          <div class="w-full max-w-md">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
              <p class="text-gray-600">Complete el formulario para registrarse</p>
            </div>
            <FormularioRegistro />
          </div>
        </div>

        {/* Banner */}
        <div class="hidden md:block md:w-1/2 bg-cover bg-center">
            <img
                src="/images/Multimedia.webp"
                alt="xdxdxd"
                className={`h-full w-5/6`}
              />
        </div>
      </div>
    </>
  );
}