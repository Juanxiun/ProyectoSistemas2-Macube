interface imageProps {
  url1: string;
  url2: string;
}

export function ImageElement({ url1, url2 }: imageProps) {
  return (
    <picture>
      <source
        srcSet={url2}
        media="(max-width: 768px)"
      />
      <img src={url1} alt="asndklas" />
    </picture>
  );
}
