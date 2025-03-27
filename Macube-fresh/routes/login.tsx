import Login from "../islands/Login.tsx";

export default function LoginPage() {
  return (
    <div class="flex h-screen">
      {/* Sección de la imagen a la izquierda */}
      <div class="w-1/2 h-screen flex items-center justify-center bg-gray-200">
  <img src="https://img.freepik.com/vector-gratis/diseno-fondo-arquitectura_1168-31.jpg" 
       alt="Imagen de inicio de sesión" 
       class="w-full h-full object-cover"/>
</div>


      {/* Sección del login a la derecha */}
      <div class="w-1/2 flex items-center justify-center">
        <div class="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
          <h1 class="text-2xl font-bold mb-4 text-center">Iniciar sesión</h1>
          <Login />
        </div>
      </div>
    </div>
  );
}
