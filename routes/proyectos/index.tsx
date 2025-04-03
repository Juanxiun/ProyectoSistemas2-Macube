import { NavBar } from "../../islands/NavBar.tsx";
import { SiderBar } from "../../islands/SiderBar.tsx";
import { ProyView } from "../../islands/ProyView.tsx";

export default function ProyHome() {
  return (
    <main class="main-index">
      <SiderBar userAllow />

      <div class="main-index-in">
        <div class="fixed w-full">
          <NavBar isAllowed />
        </div>
        <div class="main-index-a">
          <div class="main-index-a-count">
            <ProyView />
          </div>
        </div>
      </div>
    </main>
  );
}
