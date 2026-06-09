import { useState } from 'react';
import { CatListing } from '../utils/cat';

type AgeFilter = 'all' | 'kitten' | 'adult' | 'senior';
type SexFilter = 'all' | 'male' | 'female';
type TemperamentFilter = 'all' | 'social' | 'independent' | 'bonded pair';

interface AdoptProps {
  data: { cats: CatListing[] };
}

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Apply',
    description: "Complete our adoption application. Tell us about your home, lifestyle, and what you're looking for in a companion.",
  },
  {
    number: '02',
    title: 'Meet',
    description: "We'll match you with cats whose needs and temperament suit your home. Meetings are relaxed, unhurried, and on the cat's terms.",
  },
  {
    number: '03',
    title: 'Home Visit',
    description: "A brief, friendly check to ensure the environment is safe and ready. We're here to help, not to judge.",
  },
  {
    number: '04',
    title: 'Welcome Home',
    description: 'Your cat comes home with everything they need to settle in. We remain available for support as long as you need us.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What is the adoption fee?',
    answer: "Fees vary by cat and cover spay/neuter, vaccinations, microchipping, and a veterinary health check. Specific fees are listed on each cat's profile.",
  },
  {
    question: 'How long does the process take?',
    answer: "Most adoptions are completed within one to two weeks from application to welcome home. We move at a pace that's right for you and the cat.",
  },
  {
    question: 'Are there requirements to adopt?',
    answer: "We ask that adopters be 21 or older, have landlord approval if renting, and have the means to provide ongoing veterinary care. Each cat may have additional specific needs.",
  },
  {
    question: "What if it's not the right fit?",
    answer: 'We ask that you return the cat to us rather than rehome independently. No judgment. Finding the right match matters more than any single placement.',
  },
];

const Adopt = ({ data }: AdoptProps) => {
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('all');
  const [sexFilter, setSexFilter] = useState<SexFilter>('all');
  const [temperamentFilter, setTemperamentFilter] = useState<TemperamentFilter>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filtered = (data?.cats ?? []).filter((cat) => {
    if (ageFilter !== 'all' && cat.age !== ageFilter) return false;
    if (sexFilter !== 'all' && cat.sex !== sexFilter) return false;
    if (temperamentFilter !== 'all' && cat.temperament !== temperamentFilter) return false;
    return true;
  });

  const resetFilters = () => {
    setAgeFilter('all');
    setSexFilter('all');
    setTemperamentFilter('all');
  };

  const hasActiveFilters =
    ageFilter !== 'all' || sexFilter !== 'all' || temperamentFilter !== 'all';

  return (
    <>
      {/* Page Header */}
      <section className="section section--wide">
        <div className="">
          <div className="section__content center">
            <h1 className="section__title">Find Your Cat</h1>
            <p className="section__label">Every cat here is ready for their next chapter.</p>
            <p className="section__body">
              Each listing below is a cat in our care: fostered, loved, and waiting. Take your
              time. The right match is worth it.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="section section--narrow">
        <div className="filters__bar center">
          <button
            className="full"
            onClick={() => setFiltersOpen((prev) => !prev)}
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? 'Hide filters' : `Filter${hasActiveFilters ? '' : ''}`}
          </button>
          {(filtersOpen) ? (
            <div className={`filters__controls ${filtersOpen ? ' filters__controls--open' : ''}`}>
              <div className="flex-content flex--column-mobile flex--center">
                <div className="flex__small--12">
                <p className="section__label">Age</p>
                <div className="flex--center">
                  {(['all', 'kitten', 'adult', 'senior'] as AgeFilter[]).map((opt) => (
                    <button
                      key={opt}
                      className={`button__chip${ageFilter === opt ? ' button__chip--active' : ''}`}
                      onClick={() => setAgeFilter(opt)}
                    >
                      {opt === 'all' ? 'Any age' : opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex__small--12">
                <p className="section__label">Sex</p>
                <div className="flex--center">
                  {(['all', 'male', 'female'] as SexFilter[]).map((opt) => (
                    <button
                      key={opt}
                      className={`button__chip${sexFilter === opt ? ' button__chip--active' : ''}`}
                      onClick={() => setSexFilter(opt)}
                    >
                      {opt === 'all' ? 'Any' : opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex__small--12">
                <p className="section__label">Temperament</p>
                <div className="flex--center">
                  {(['all', 'social', 'independent', 'bonded pair'] as TemperamentFilter[]).map((opt) => (
                    <button
                      key={opt}
                      className={`button__chip${temperamentFilter === opt ? ' button__chip--active' : ''}`}
                      onClick={() => setTemperamentFilter(opt)}
                    >
                      {opt === 'all' ? 'Any' : opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="filters__controls--closed"></div>
        )}          
        </div>
      </section>

      {/* Listings Grid */}
      <section className="section">
        <div className="section__content">
          {filtered.length > 0 ? (
            <div className="flex-content card-grid">
              {filtered.map((cat) => (
                <div className="cat-card flex__small--12 flex__large--4" key={cat.id}>
                  <img src={cat.image} alt={cat.name} className="cat-card__image" />
                  <div className="cat-card__body">
                    <h3 className="cat-card__name">{cat.name}</h3>
                    <p className="cat-card__meta">{cat.age} · {cat.sex} · {cat.temperament}</p>
                    <p className="cat-card__description">{cat.blurb}</p>
                    <a href={`/adopt/${cat.id}`} className="button cat-card__cta">
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (hasActiveFilters ? (
            <div className="center">
              <p className="section__body">No cats match your current filters.</p>
              <button className="full" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          ) : (<div className="center">
              <p className="section__body">No cats are available for adoption. Please check back later.</p>
            </div> 
          ))}
        </div>
      </section>

      {/* Adoption Process */}
      <section className="section section--alt">
          <div className="section__content center">
            <h2 className="section__title">How It Works</h2>
            <p className="section__label">Four steps to a new beginning</p>
            <div className="flex-content card-grid">
              {PROCESS_STEPS.map((step) => (
                <div className="service-card flex__small--12 flex__large--3" key={step.number}>
                  <span className="service-card__number">{step.number}</span>
                  <h3 className="service-card__title">{step.title}</h3>
                  <p className="service-card__description">{step.description}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--narrow">
        <div className="section__content center">
          <h2 className="section__title">Common Questions</h2>
          {FAQ_ITEMS.map((item) => (
            <div
              className={`section__item${openFaq === item.question ? ' section__item--open' : ''}`}
              key={item.question}
            >
              <button
                className="accordion-button"
                onClick={() => setOpenFaq(openFaq === item.question ? null : item.question)}
                aria-expanded={openFaq === item.question}
              >
                <span>{item.question}</span>
                <span className="accordion-button__icon" aria-hidden="true">
                  {openFaq === item.question ? '−' : '+'}
                </span>
              </button>
              {openFaq === item.question && (
                <p className="accordion-button__content">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Band */}
      <section className="section">
          <div className="section__content center">
            <h2 className="section__title">Not ready to adopt?</h2>
            <p className="section__body">
              Fostering and donating make every adoption possible.
            </p>
          <div className="flex-content flex--column-mobile flex--center">
            <a href="/foster" className="button button--alt2">Become a Foster</a>
            <a href="/donate" className="button button">Give with Heart</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Adopt;