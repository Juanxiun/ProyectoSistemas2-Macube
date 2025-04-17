import { useState } from "preact/hooks";

interface dataProps {
  icon: string;
  url: string;
  text: string;
}

export function LinkElement({ icon, url, text }: dataProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handlerLink = () => {
    globalThis.location.href = url;
  };

  return (
    <div
      class="linkS-cont"
      onClick={handlerLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        class="linkS-cont-img"
        src={`/favicon/${icon}`}
        alt="icon"
      />
      {isHovered && (
        <div class="linkS-cont-div">
          <span class="linkS-cont-a">
            {text}
          </span>
        </div>
      )}
    </div>
  );
}
