import { useEffect, useState } from "preact/hooks/";

interface ProyResult {
  id: string;
  nomproy: string;
  depproy: string;
}

export function SearchBar() {
  const [srch, setSrch] = useState<string>("");
  const [results, setResults] = useState<ProyResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlerSearch = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setSrch(target.value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (srch.length > 2) {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch(`/api/proyApi/proySrh?q=${srch}`);
          const data = await res.json();

          if (res.status === 200 && data.data) {
            setResults(data.data);
          } else if (data.message) {
            setResults([]);
            setError(data.message);
          }
        } catch (err) {
          console.error("Error al buscar proyectos:", err);
          setError("Error al buscar proyectos.");
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setError(null);
      }
    };

    fetchResults();
  }, [srch]);

  const handlerRedirect = (id: string) => {
    globalThis.location.href = `/proyectos/detalles/${id}`;
  };

  return (
    <form class="search">
      <div class="search_cont_ipt">
        <div class="search_cont_img">
          <img class="h-6" src="/assets/nav/buscar.svg" alt="Buscar" />
        </div>

        <input
          type="search"
          name="search"
          id="search"
          placeholder="nombre, departamento, tipo o ci"
          onInput={handlerSearch}
          class="search_ipt"
        />
      </div>

      <div
        className={`${
          srch.length > 2
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } search_result`}
      >
        {loading && <p class="text-[#c7c7c7] text-center">Cargando...</p>}
        {!loading && error && <p class="text-red-500 text-center">{error}</p>}
        {!loading &&
          !error &&
          results.map((result) => (
            <div
              key={result.id}
              onClick={() => {
                handlerRedirect(result.id);
              }}
              class="search_result_item"
            >
              <h3 class="text-lg font-bold text-white truncate">
                {result.nomproy}
              </h3>
              <p class="text-sm text-[#c7c7c7]">{result.depproy}</p>
            </div>
          ))}
      </div>
    </form>
  );
}
