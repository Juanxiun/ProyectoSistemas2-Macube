import { useState } from "preact/hooks/";

interface LinkProps {
  url: string;
  text: string;
}

interface DetailProps {
  id: string;
  titulo: string;
  aditional?: string;
  link: LinkProps[];
}

export function FilterElement({ id, titulo, aditional, link }: DetailProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id={id}
      className="details"
      onClick={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="details_title">
        {aditional
          ? <img className="detail_img" src={aditional} alt="icono" />
          : (
            ""
          )}
      </div>

      {open && (
        <form className="details_cont">
          <span className="detail_span">{titulo}</span>
          {link.map((l, index) =>
            l
              ? (
                <a
                  className="details_a"
                  key={index}
                  href={l.url}
                >
                  {l.text}
                </a>
              )
              : null
          )}
        </form>
      )}
    </div>
  );
}
