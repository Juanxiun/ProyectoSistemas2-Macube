interface cartProp {
  nomproy: string;
  tipproy: string;
  iniproy: Date;
  preproy: string;
  depproy: string;
  imgproy: string;
}

export function CartPElement(
  { nomproy, tipproy, iniproy, preproy, depproy, imgproy }: cartProp,
) {
  return (
    <>
      <div class="h-[230px] w-full overflow-hidden">
        <img src={imgproy} alt={nomproy} class="w-full h-full object-cover" />
      </div>

      <div class="z-20 p-6 bg-[#393a44] rounded-b-2xl">
        <h2 class="text-2xl font-bold text-white truncate mb-2">{nomproy}</h2>
        <p class="text-lg text-[#c7c7c7] mb-4">{tipproy}</p>
        <p class="text-sm text-[#c7c7c7]">
          <span className="font-semibold">Inicio:</span>{" "}
          {new Date(iniproy).toLocaleDateString()}
        </p>
        <p class="text-sm text-[#c7c7c7]">
          <span className="font-bold">Presupuesto:</span> ${preproy}
        </p>
        <p class="text-sm text-[#c7c7c7]">
          <span className="font-bold">Departamento:</span> {depproy}
        </p>
      </div>
    </>
  );
}
