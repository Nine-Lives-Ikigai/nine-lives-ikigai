import { CatListing } from '../utils/cat';

const SERVICES = [
  {
    number: '01',
    title: 'Community Care (TNR)',
    description: 'Humane population management through community trap-neuter-return programs; stabilizing colonies, reducing suffering, and coexisting with feral cats.',
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
];

const QUOTE_INDEX = 0;
const QUOTES = [
  {
    text: "Life can be started over many times. People live while mending.",
    cite: "— Hori Michihiro, 'Kintsugi Ojisan'",
  },
  {
    text: "Kintsugi teaches that what has been broken is not diminished. It is made more beautiful, more resilient, more itself.",
    cite: "— Nine Lives Ikigai",
  },
];

const Home = ({ data }: { data: { featuredCats: CatListing[] } }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="section section--wide">
        <div className="section__container">
          <div className="section__content center">
            <h1 className="section__title">Nine Lives Ikigai</h1>
            <p className="section__label">Where every cat finds its purpose again.</p>
            <p className="section__body">
              We believe every cat deserves a life of purpose and dignity. Whether they've known
              hardship, homelessness, or simply need a second chance. Rooted in ikigai and the art
              of kintsugi, we find meaning in the mending.
            </p>
            <div className="section__ctas flex-content">
              <a href="#adopt" className="button button--primary">Meet Our Cats</a>
              <a href="#support" className="button button--secondary">Support Our Mission</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section section--alt" id="about">
        <div className="section__container">
          <div className="section__content center">
            <h2 className="section__title">Our Belief</h2>
            {QUOTES.map((quote, index) => (
              QUOTE_INDEX === index) ? (
              <blockquote key={index} className="section__quote">
                <p>{quote.text}</p>
                <cite className="section__cite">{quote.cite}</cite>
              </blockquote>
            ) : null)}
            <p className="section__body">
              We apply this to every cat that comes through our doors: the feral colony cat, the
              injured stray, the owner-surrendered companion. Their past does not diminish them.
              Our work is the gold in the cracks.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <div className="section__container">
          <div className="section__content center">
            <h2 className="section__title">What We Do</h2>
            <p className="section__label">Four paths to a better life</p>
            <div className="flex-content services__grid">
              {SERVICES.map((service) => (
                <div className="service-card service-card--alt service-card--tall flex__small--12 flex__large--3" key={service.number}>
                  <span className="service-card__number">{service.number}</span>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Adopt Teaser Section */}
      <section className="section section--alt" id="adopt">
        <div className="section__container">
          <div className="section__content center">
            <h2 className="section__title">Meet Our Cats</h2>
            <p className="section__label">Looking for a home right now</p>
            <div className="flex-content services__grid">
              {data?.featuredCats?.map((cat) => (
                <div className="cat-card flex__small--12 flex__large--4" key={cat.id}>
                  <img src={cat.image} alt={cat.name} className="cat-card__image" />
                  <div className="cat-card__body">
                    <h3 className="cat-card__name">{cat.name}</h3>
                    <p className="cat-card__meta">{cat.age} · {cat.sex}</p>
                    <p className="cat-card__description">{cat.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="/adopt" className="button button--primary">See All Available Cats</a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section" id="support">
        <div className="section__container">
          <div className="section__content center">
            <h2 className="section__title">Every life has a reason. Help us find theirs.</h2>
            <div className="flex-content">
              <a href="/adopt" className="button button--alt">Adopt a Cat</a>
              <a href="#foster" className="button button--alt2">Become a Foster</a>
              <a href="#donate" className="button">Give with Heart</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;