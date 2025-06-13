import { ComponentChildren } from "preact/src/index.d.ts";

interface cartProp {
  children: ComponentChildren;
  titulo: string;
  edit: boolean;
  // deno-lint-ignore no-explicit-any
  onclick: any;
  styleCLS?: string;
}

export function CartUI(
  { children, onclick, titulo, edit, styleCLS }: cartProp,
) {
  return (
    <div class={styleCLS ?? "proycart_main"}>
      { edit &&
        <div
          onClick={onclick}
          class="bg-white rounded-full p-2 cursor-pointer absolute right-2 top-2 flex justify-center 
              align-middle items-centerhover:bg-[#e4c36f]"
        >
          <img src="/assets/carts/lapiz.svg" height={30} width={30} alt="" />
        </div>
      }
      <div class="w-full h-full">
        <h1 class="proycart_title">{titulo}</h1>
        <div class="w-full h-4/6">
          {children}
        </div>
      </div>
    </div>
  );
}
