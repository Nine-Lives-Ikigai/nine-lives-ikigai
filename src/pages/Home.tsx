import { CatListing } from '../utils/cat';

const HERO = {
  title: 'Nine Lives Ikigai',
  label: 'Where every cat finds its purpose again.',
  body: "We believe every cat deserves a life of purpose and dignity; whether they've known hardship, homelessness, or simply need a second chance. Rooted in ikigai and the art of kintsugi, we find meaning in the mending.",
  cta: [
    { label: 'Meet Our Cats', href: '/adopt', variant: 'button--alt' },
    { label: 'Get Involved', href: '#support', variant: 'button' },
  ],
};

const ABOUT = {
  title: 'Our Belief',
  quote: {
    text: "Life can be started over many times. People live while mending.",
    cite: "— Hori Michihiro, 'Kintsugi Ojisan'",
  },
  body: "We apply this to every cat that comes through our doors: the feral colony cat, the injured stray, the owner-surrendered companion. Their past does not diminish them. Our work is the gold in the cracks.",
};

const SERVICES = {
  title: 'What We Do',
  label: 'Four paths to a better life',
  items: [
    {
      number: '01',
      title: 'Community Care',
      description: 'Humane population management through community trap-neuter-return (TNR) programs; stabilizing colonies, reducing suffering, and coexisting with feral cats.',
    },
    {
      number: '02',
      title: 'Foster Care',
      description: 'Temporary homes that give cats the safety, socialization, and healing they need before finding a permanent family.',
    },
    {
      number: '03',
      title: 'Adoption',
      description: 'Thoughtful, lasting placements for stray, rescued, and surrendered cats; matching the right cat to the right home.',
    },
    {
      number: '04',
      title: 'Veterinary Aid',
      description: 'Medical care, spay/neuter access, and emergency treatment for cats in need, regardless of their origins or circumstances.',
    },
  ],
};

const ADOPT_TEASER = {
  title: 'Meet Our Cats',
  label: 'Looking for a home right now',
  cta: { label: 'See All Available Cats', href: '/adopt', variant: 'button--alt' },
};

const FINAL_CTA = {
  title: 'Every life has a reason. Help us find theirs.',
  cta: [
    { label: 'Adopt a Cat', href: '/adopt', variant: 'button--alt' },
    { label: 'Donate', href: '/donate', variant: 'button' },
    { label: 'Become a Foster', href: '/foster', variant: 'button--alt2' },
  ],
};

const Home = ({ data }: { data: { featuredCats: CatListing[] } }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="section section--wide">
        <div className="section__content center">
          <h1 className="section__title">{HERO.title}</h1>
          <p className="section__label">{HERO.label}</p>
          <p className="section__body">{HERO.body}</p>
          <div className="flex-content flex--column-mobile flex--center">
            {HERO.cta.map((item) => (
              <a key={item.href} href={item.href} className={`button ${item.variant}`}>{item.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section section--alt" id="about">
        <div className="section__content center">
          <h2 className="section__title">{ABOUT.title}</h2>
          <blockquote className="section__quote">
            <p>{ABOUT.quote.text}</p>
            <cite className="section__cite">{ABOUT.quote.cite}</cite>
          </blockquote>
          <p className="section__body">{ABOUT.body}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <div className="section__content center">
          <h2 className="section__title">{SERVICES.title}</h2>
          <p className="section__label">{SERVICES.label}</p>
          <div className="flex-content services__grid">
            {SERVICES.items.map((service) => (
              <div className="service-card service-card--alt service-card--tall flex__small--12 flex__large--3" key={service.number}>
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
          <h2 className="section__title">{ADOPT_TEASER.title}</h2>
          <p className="section__label">{ADOPT_TEASER.label}</p>
          <div className="flex-content services__grid">
            {data?.featuredCats?.map((cat) => (
              <div className="cat-card flex__small--12 flex__large--4" key={cat.id}>
                <img src={cat.image} alt={cat.name} className="cat-card__image" />
                <div className="cat-card__body">
                  <h3 className="cat-card__name">{cat.name}</h3>
                  <p className="cat-card__meta">{cat.age} &middot; {cat.sex}</p>
                  <p className="cat-card__description">{cat.blurb}</p>
                  <a href={`/adopt/${cat.id}`} className="button cat-card__cta">Meet {cat.name}</a>
                </div>
              </div>
            ))}
          </div>
          <a href={ADOPT_TEASER.cta.href} className={`button ${ADOPT_TEASER.cta.variant}`}>{ADOPT_TEASER.cta.label}</a>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section" id="support">
        <div className="section__content center">
          <h2 className="section__title">{FINAL_CTA.title}</h2>
          <div className="flex-content flex--column-mobile flex--center">
            {FINAL_CTA.cta.map((item) => (
              <a key={item.href} href={item.href} className={`button ${item.variant}`}>{item.label}</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;