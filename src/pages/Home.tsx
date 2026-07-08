import { CatListing } from '../utils/cat';
import type { HomeData } from '../utils/data';

interface HomeProps {
  data: HomeData;
}

const Home = ({ data }: HomeProps) => {
  const { hero, about, services, adoptTeaser, finalCta, featuredCats } = data;

  return (
    <>
      {/* Hero Section */}
      <section className="section">
        <div className="section__content center">
          <h1 className="section__title">{hero.title}</h1>
          <p className="section__label">{hero.label}</p>
          <p className="section__body">{hero.body}</p>
          <div className="flex-content flex--column-mobile flex--center">
            {hero.cta.map((item) => (
              <a key={item.href} href={item.href} className={`button ${item.variant}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section section--alt" id="about">
        <div className="section__content center">
          <h2 className="section__title">{about.title}</h2>
          <blockquote className="section__quote">
            <p>{about.quote.text}</p>
            <cite className="section__cite">{about.quote.cite}</cite>
          </blockquote>
          <p className="section__body">{about.body}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <div className="section__content center">
          <h2 className="section__title">{services.title}</h2>
          <p className="section__label">{services.label}</p>
          <div className="flex-content services__grid">
            {services.items.map((service) => (
              <div
                className="service-card service-card--alt service-card--tall flex__small--12 flex__large--3"
                key={service.number}
              >
                <span className="service-card__number">{service.number}</span>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adopt Teaser Section */}
      <section className="section section--alt" id="adopt">
        <div className="section__content center">
          <h2 className="section__title">{adoptTeaser.title}</h2>
          <p className="section__label">{adoptTeaser.label}</p>
          <div className="flex-content services__grid">
            {featuredCats.map((cat: CatListing) => (
              <div className="cat-card flex__small--12 flex__large--4" key={cat.id}>
                <img src={cat.image} alt={cat.name} className="cat-card__image" />
                <div className="cat-card__body">
                  <h3 className="cat-card__name">{cat.name}</h3>
                  <p className="cat-card__meta">{cat.age} &middot; {cat.sex}</p>
                  <p className="cat-card__description">{cat.blurb}</p>
                  <a href={`/adopt/${cat.id}`} className="button">
                    Meet {cat.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <a href={adoptTeaser.cta.href} className={`button ${adoptTeaser.cta.variant}`}>
            {adoptTeaser.cta.label}
          </a>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section" id="support">
        <div className="section__content center">
          <h2 className="section__title">{finalCta.title}</h2>
          <div className="flex-content flex--column-mobile flex--center">
            {finalCta.cta.map((item) => (
              <a key={item.href} href={item.href} className={`button ${item.variant}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;