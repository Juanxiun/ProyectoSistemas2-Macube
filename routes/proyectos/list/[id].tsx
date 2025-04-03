import { PageProps } from "$fresh/server.ts";
import { TitleComp } from "../../../components/TitleComp.tsx";
import { NavBar } from "../../../islands/NavBar.tsx";
import { ProyViewID } from "../../../islands/ProyViewID.tsx";
import { SiderBar } from "../../../islands/SiderBar.tsx";

export default function listID(props: PageProps) {
  return (
    <main class="main-index">
      <SiderBar userAllow />

      <div class="main-index-in">
        <div class="fixed w-full">
          <NavBar isAllowed />
        </div>
        <div class="main-index-a">
          <div class="main-index-a-count">
            <ProyViewID id={Number(props.params.id)} />
          </div>
        </div>
      </div>
    </main>
  );
}
