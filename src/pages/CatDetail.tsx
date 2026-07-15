import CtaButton from '../components/CtaButton';
import CatGallery from '../components/CatGallery';
import { Navigate, useParams } from 'react-router-dom';
import type { CatDetailData } from '../utils/data';

interface CatDetailProps {
  data: CatDetailData;
}

const CatDetail = ({ data }: CatDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const cat = data.cats.find((c) => c.id === id);
  const footerCta = data.footerCta;

  // Bad or stale :id (e.g. a shared link to a cat that's since been
  // adopted/removed) — send back to the listing instead of a blank page.
  if (!cat) {
    return <Navigate to="/adopt" replace />;
  }

  return (
    <>
      <section className="section section--hero-small">

        {/* Cat Name */}
        <div className="section__content center">
        <h1 className="section__title">{cat.name}</h1>
          {cat.nickname && <p className="section__label">&ldquo;{cat.nickname}&rdquo;</p>}
          <p className="cat-card__description">{cat.blurb}</p>
        </div>

        {/* Cat Gallery and Info */}
        <div className="section__content center">
          <div className="flex-content flex--center">
            <div className="flex__small--12 flex__large--6">
              <CatGallery name={cat.name} hero={cat.hero} images={cat.images} secret={cat.secret} />
            </div>
            <div className="flex__small--12 flex__large--6">
              <div className="cat-detail__meta">
                <p className="cat-card__meta">
                  Age &middot; <span>{cat.age}</span>
                </p>
                <p className="cat-card__meta">
                  Sex &middot; <span>{cat.sex}</span>
                </p>
                <p className="cat-card__meta">
                  Breed &middot; <span>{cat.breed}</span>
                </p>
                <p className="cat-card__meta">
                  Color &middot; <span>{cat.color}</span>
                </p>
                <p className="cat-card__meta">
                  Coat &middot; <span>{cat.coat}</span>
                </p>
                <p className="cat-card__meta">
                  Temperament &middot; <span>{cat.temperament}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="section__content center">
          <h2 className="section__title">{footerCta.title}</h2>
          <p className="section__body">{footerCta.body}</p>
          <div className="flex-content flex--column-mobile flex--center">
            {footerCta.cta.map((item) => (
              <CtaButton key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CatDetail;