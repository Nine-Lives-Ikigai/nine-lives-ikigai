import CatCard from '../components/CatCard';
import CtaButton from '../components/CtaButton';
import CtaGroup from '../components/CtaGroup.tsx';
import PageSection from '../components/PageSection';
import type { HomeData } from '../utils/data';

interface HomeProps {
  data: HomeData;
}

const Home = ({ data }: HomeProps) => {
  const { hero, about, services, adoptTeaser, footerCta, featuredCats } = data;

  return (
    <>
      {/* Hero Section */}
      <PageSection variant="hero">
        <h1 className="section__title">{hero.title}</h1>
        <p className="section__label">{hero.label}</p>
        <p className="section__body">{hero.body}</p>
        <CtaGroup items={hero.cta} />
      </PageSection>

      {/* About Section */}
      <PageSection variant="primary" id="about">
        <h2 className="section__title">{about.title}</h2>
        <figure>
          <blockquote className="section__quote">
            <p>{about.quote.text}</p>
          </blockquote>
          <figcaption className="section__cite">{about.quote.cite}</figcaption>
        </figure>
        <p className="section__body">{about.body}</p>
      </PageSection>

      {/* Services Section */}
      <PageSection id="services">
        <h2 className="section__title">{services.title}</h2>
        <p className="section__label">{services.label}</p>
        <div className="flex-content services__grid">
          {services.items.map((service) => (
            <div
              className="service-card flex__small--12 flex__large--3"
              key={service.number}
            >
              <span className="service-card__number">{service.number}</span>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Adopt Teaser Section */}
      <PageSection id="adopt">
        <h2 className="section__title">{adoptTeaser.title}</h2>
        <p className="section__label">{adoptTeaser.label}</p>
        <div className="flex-content services__grid">
          {featuredCats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
        <CtaButton item={adoptTeaser.cta} />
      </PageSection>

      {/* Final CTA Section */}
      <PageSection id="support">
        <h2 className="section__title">{footerCta.title}</h2>
        <CtaGroup items={footerCta.cta} />
      </PageSection>
    </>
  );
};

export default Home;