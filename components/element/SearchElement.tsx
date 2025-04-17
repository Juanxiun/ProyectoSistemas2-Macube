import { useEffect } from "preact/hooks/";

export function SearchElement() {
  useEffect(() => {
  });

  return (
    <form class="w-full">
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="w-full pl-10 py-2 bg-white rounded-2xl"
          placeholder="nombre del proyecto"
          required
        />
        <button
          type="submit"
          class="absolute bg-[#393a44] text-white px-3 py-2 rounded-r-2xl right-0"
        >
          BUSCAR
        </button>
      </div>
    </form>
  );
}
