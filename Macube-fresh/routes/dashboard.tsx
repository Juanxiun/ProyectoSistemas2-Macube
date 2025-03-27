import ProjectSections from "../islands/ProjectSections.tsx";
import ModalSettings from "../islands/ModalSettings.tsx";

export default function Dashboard() {
  return (
    <div class="">
      <ModalSettings />
      <h1 class="text-2xl font-bold">Bienvenido</h1>
      
      <p>Has iniciado sesión correctamente.</p>

      {/* Secciones interactivas */}
      <ProjectSections />
    </div>
  );
}
