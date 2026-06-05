const Home = ({ data }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="section section__hero">
        <div className="section__container">
          <div className="section__content center">
            <h1 className="section__title">Nine Lives Ikigai</h1>
            <p className="section__label">Where every cat finds its purpose again.</p>
            <p className="section__body section__body--alt">
              We believe every cat deserves a life of purpose and dignity. Whether they've known hardship, homelessness, or simply need a second chance. Rooted in ikigai and the art of kintsugi, we find meaning in the mending.
            </p>
            <div className="section__ctas">
              <a href="#adopt" className="button button--primary">Meet Our Cats</a>
              <a href="#support" className="button button--secondary">Support Our Mission</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section section__philosophy" id="about">
        <div className="section__container">
          <div className="section__content center">
            <h2 className="section__title section__title--alt">Our Belief</h2>
            <blockquote className="section__quote">
              <p>Kintsugi teaches that what has been broken is not diminished. It is made more beautiful, more resilient, more itself.</p>
            </blockquote>
            <p className="section__body">
              We apply this to every cat that comes through our doors: the feral colony cat, the injured stray, the owner-surrendered companion. Their past does not diminish them. Our work is the gold in the cracks.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section__services" id="services">
        <div className="section__container">
          <div className="section__content center">
            <h2 className="section__title">What We Do</h2>
            <p className="section__label">Four paths to a better life</p>
            <div className="services__grid">
              <div className="service__item">
                <span className="service__number">01</span>
                <h3 className="service__title">Community Care (TNR)</h3>
                <p className="service__description">Humane population management through community trap-neuter-return programs; stabilizing colonies, reducing suffering, and coexisting with feral cats.</p>
              </div>
              <div className="service__item">
                <span className="service__number">02</span>
                <h3 className="service__title">Foster Care</h3>
                <p className="service__description">Temporary homes that give cats the safety, socialization, and healing they need before finding a permanent family.</p>
              </div>
              <div className="service__item">
                <span className="service__number">03</span>
                <h3 className="service__title">Adoption</h3>
                <p className="service__description">Thoughtful, lasting placements for stray, rescued, and surrendered cats; matching the right cat to the right home.</p>
              </div>
              <div className="service__item">
                <span className="service__number">04</span>
                <h3 className="service__title">Veterinary Aid</h3>
                <p className="service__description">Medical care, spay/neuter access, and emergency treatment for cats in need, regardless of their origins or circumstances.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section section__cta" id="support">
        <div className="section__container">
          <div className="section__content center">
            <h2 className="section__title">Every life has a reason. Help us find theirs.</h2>
            <div className="section__ctas">
              <a href="#adopt" className="button button--primary">Adopt a Cat</a>
              <a href="#foster" className="button button--tertiary">Become a Foster</a>
              <a href="#donate" className="button button--secondary">Give with Heart</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
