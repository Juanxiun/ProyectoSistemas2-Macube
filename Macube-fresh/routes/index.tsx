import { Head } from "$fresh/runtime.ts";
import { db } from "../lib/database/connect.ts";

export default function Home() {  
  db
  return (
    <>
          <Head>
            <title>Registro</title>
          </Head>
          <div class="min-h-screen flex">
            {/* Formulario a la izquierda */}
            <div class="flex-1 flex justify-center items-center bg-gray-100">
              <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 class="text-2xl font-bold mb-6">Registro</h2>
                <form>
                  <div class="mb-4">
                    <input
                      type="text"
                      placeholder="Nombre"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div class="mb-6">
                    <input
                      type="password"
                      placeholder="Contraseña"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Registrarse
                  </button>
                </form>
              </div>
            </div>
            {/*Parte de la imagen xdddd*/}
            <div
              class="flex-1 bg-cover bg-center"
              style="background-image: url('/background.jpg')"
            ></div>
          </div>
        </>
  );
}
