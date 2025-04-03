import { NavBar } from "../../islands/NavBar.tsx";
import { ProyNew } from "../../islands/ProyNew.tsx";
import { SiderBar } from "../../islands/SiderBar.tsx";

export default function proyCreate() {
  return (
    <main class="main-index">
      <SiderBar userAllow />

      <div class="main-index-in">
        <div class="fixed w-full">
          <NavBar isAllowed />
        </div>
        <div class="main-index-a">
          <div class="main-index-a-count">
            <ProyNew />
          </div>
        </div>
      </div>
    </main>
  );
}
