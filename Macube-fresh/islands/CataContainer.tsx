interface ProjData {
  img: string;
  title: string;
  arq: string;
}

export default function CataContainer({ img, title, arq }: ProjData) {
  return (
    <article class="CardCat">
      <img src={img} alt="img.alt" />
      <div class="CardCat-div"></div>
      <p class="CardCat-ti">
        {title}
      </p>
      <p class="CardCat-ar">
        {arq}
      </p>
    </article>
  );
}
