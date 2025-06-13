import { ComponentChildren } from "preact/src/index.d.ts";
import MessagesAlert from "../../components/Layout/messageAlert.tsx";
import { useEffect, useState } from "preact/hooks";
import { getLoadBlock } from "../../lib/utils/displayBlock.ts";
import { FormCodigo } from "../../components/Element/formCoding.tsx";

interface Props {
  children: ComponentChildren;
}

export default function EstructuraPage3({ children }: Props) {
  const [block, setBlock] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const blockDisplay = getLoadBlock();
      setBlock(blockDisplay);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`
        h-full w-full 
        lg:px-4 md:px-2 px-2 
        lg:py-5 md:py-4 py-3
        flex 
        lg:flex-row md:flex-col flex-col`}
    >
      <MessagesAlert />
      {(block) && (
        <div class=" absolute w-screen z-40 h-screen bg-white/50 backdrop-blur-xl flex justify-center align-middle items-center">
          <FormCodigo />
        </div>
      )}
      <div class="h-full lg:w-1/2 md:w-full w-full flex justify-center align-middle items-center">
        {children}
      </div>

      <div class="h-full lg:w-1/2 md:w-full lg:relative md:absolute absolute -z-10 w-full py-10 flex align-middle items-center justify-center lg:opacity-100 md:opacity-0 opacity-0">
        <img
          class="w-10/12 h-full rounded-2xl shadow-2xl border-2 border-white/30"
          src="/img/imgSess.webp"
          alt=""
        />
      </div>
    </main>
  );
}
