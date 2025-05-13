import { useState } from "preact/hooks/";

interface listipo {
  url: string;
  titulo: string;
}

interface listProp {
  titulo: string;
  icono?: string;
  lis: listipo[];
}

export function ListUI(
  { titulo, icono, lis }: listProp,
) {
  const [click, setClick] = useState(Boolean);
  return (
    <div class="md:my-3 my-1 relative">
      <div
        class="z-30 flex flex-row align-middle items-center md:my-3 my-0 cursor-pointer"
        onClick={() => {
          setClick((p) => !p);
        }}
      >
        {icono && (
          <img
            class="
            md:h-8 h-5
            md:w-8 w-5
            md:mx-1 mx-1"
            src={icono}
            alt="icono"
          />
        )}
        <h2 class="md:text-xl text-lg text-center text-[#e4c36f]">{titulo}</h2>
      </div>
      <ul
        class={`z-40 lg:opacity-100 lg:relative lg:bg-[#393a44] lg:px-3 lg:py-2 lg:rounded-lg ${
            click
              ? "z-40 md:absolute opacity-100 bg-[#393a44] px-3 py-2 rounded-lg"
              : " md:absolute opacity-0"
          }`}
      >
        {lis.length > 0 &&
          lis.map((item) => (
            <li class="my-1 py-1 md:text-xl md:pl-5 pl-0 hover:text-[#658895]" key={item}>
              <a href={item.url}>{item.titulo}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
