import type { CatListing } from '../utils/cat';

interface CatCardProps {
  cat: CatListing;
  showTemperament?: boolean;
}

const CatCard = ({ cat, showTemperament = false }: CatCardProps) => (
  <div className="cat-card flex__small--12 flex__large--4">
    <img src={cat.hero} alt={cat.name} className="cat-card__image" />
    <div className="cat-card__body">
      <h3 className="cat-card__name">{cat.name}</h3>
      <p className="cat-card__meta">
        {cat.age} &middot; {cat.sex}
        {showTemperament && <> &middot; {cat.temperament}</>}
      </p>
      <p className="cat-card__description">{cat.blurb}</p>
      <a href={`/adopt/${cat.id}`} className="button">
        Meet {cat.name}
      </a>
    </div>
  </div>
);

export default CatCard;