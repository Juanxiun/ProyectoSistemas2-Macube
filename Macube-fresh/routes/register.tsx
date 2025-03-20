// routes/registro.tsx
import { Head } from "$fresh/runtime.ts";
import FormularioRegistro from "../islands/FormRegister.tsx";

export default function Registro() {
  return (
    <>
      <Head>
        <title>Registro</title>
      </Head>
      <div class="min-h-screen flex">
        <div class="flex-1 flex justify-center items-center bg-gray-100">
          <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6">Registro</h2>
            <FormularioRegistro />
          </div>
        </div>
        
        <div
          class="flex-1 bg-cover bg-center"
          style="background-image: url('/Foto_inicio.jpg')"
        ></div>
      </div>
    </>
  );
}