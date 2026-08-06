import type { CatListing } from '../utils/cat';

interface CatCardProps {
  cat: CatListing;
  isBonded?: boolean;
}

const CatCard = ({ cat, isBonded = false }: CatCardProps) => (
  <div className="cat-card flex__small--12 flex__large--4">
    <a href={`/adopt/${cat.id}`}>
      <img src={cat.hero} alt={cat.name} className="cat-card__image" />
    </a>
    <div className="cat-card__body">
      <h3 className="cat-card__name">{cat.name}</h3>
      <p className="cat-card__meta">
        {cat.age} &middot; {cat.sex} {isBonded && <>&middot; Bonded Pair</>}
      </p>
      <p className="cat-card__description">{cat.blurb}</p>
      <a href={`/adopt/${cat.id}`} className="button">
        Meet {cat.name}
      </a>
    </div>
  </div>
);

export default CatCard;