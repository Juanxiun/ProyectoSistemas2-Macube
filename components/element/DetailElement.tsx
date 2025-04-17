import { useState } from "preact/hooks/";

interface LinkProps {
  url: string;
  text: string;
}

interface DetailProps {
  id: string;
  summary: string;
  aditional?: string;
  link: LinkProps[];
}

export function DetailElement({ id, summary, aditional, link }: DetailProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id={id}
      className="details"
      onMouseEnter={() => setOpen(true)}
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
        <div className="details_cont">
          <span className="detail_span">{summary}</span>
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
        </div>
      )}
    </div>
  );
}
