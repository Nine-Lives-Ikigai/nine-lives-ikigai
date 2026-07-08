import { useMemo, useState } from 'react';
import { CatListing } from '../utils/cat';
import type { AdoptData } from '../utils/data';

const ANY = 'any' as const;
type FilterValue = typeof ANY | string;

interface AdoptProps {
  data: AdoptData;
}

const Adopt = ({ data }: AdoptProps) => {
  const { pageHeader, processSteps, faq, footerCta, cats, catFilters } = data;

  // catFilters has no "sexes" list, so this is derived from the actual
  // cat records rather than hardcoded.
  const sexOptions = useMemo(
    () => Array.from(new Set(cats.map((cat) => cat.sex))),
    [cats]
  );

  const [ageFilter, setAgeFilter] = useState<FilterValue>(ANY);
  const [sexFilter, setSexFilter] = useState<FilterValue>(ANY);
  const [temperamentFilter, setTemperamentFilter] = useState<FilterValue>(ANY);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filtered = cats.filter((cat: CatListing) => {
    if (ageFilter !== ANY && cat.age !== ageFilter) return false;
    if (sexFilter !== ANY && cat.sex !== sexFilter) return false;
    if (temperamentFilter !== ANY && cat.temperament !== temperamentFilter) return false;
    return true;
  });

  const resetFilters = () => {
    setAgeFilter(ANY);
    setSexFilter(ANY);
    setTemperamentFilter(ANY);
  };

  const hasActiveFilters =
    ageFilter !== ANY || sexFilter !== ANY || temperamentFilter !== ANY;

  return (
    <>
      {/* Page Header */}
      <section className="section section--hero-alt">
        <div className="section__content center">
          <h1 className="section__title">{pageHeader.title}</h1>
          <p className="section__label">{pageHeader.label}</p>
          <p className="section__body">{pageHeader.body}</p>
        </div>
      </section>

      {/* Filter */}
      <section className="section">
        <div className="filters__bar center">
          <button
            className="full"
            onClick={() => setFiltersOpen((prev) => !prev)}
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? 'Hide Filters' : hasActiveFilters ? 'Edit Filters' : 'Filter'}
          </button>
          {filtersOpen && (
            <div className="filters__controls filters__controls--open">
              <div className="flex-content flex--column-mobile flex--center">
                <div className="flex__small--12">
                  <p className="section__label">Age</p>
                  <div className="flex--center">
                    {[ANY, ...catFilters.ages].map((opt) => (
                      <button
                        key={opt}
                        className={`button__chip${ageFilter === opt ? ' button__chip--active' : ''}`}
                        onClick={() => setAgeFilter(opt)}
                      >
                        {opt === ANY ? 'Any age' : opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex__small--12">
                  <p className="section__label">Sex</p>
                  <div className="flex--center">
                    {[ANY, ...sexOptions].map((opt) => (
                      <button
                        key={opt}
                        className={`button__chip${sexFilter === opt ? ' button__chip--active' : ''}`}
                        onClick={() => setSexFilter(opt)}
                      >
                        {opt === ANY ? 'Any' : opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex__small--12">
                  <p className="section__label">Temperament</p>
                  <div className="flex--center">
                    {[ANY, ...catFilters.temperaments].map((opt) => (
                      <button
                        key={opt}
                        className={`button__chip${temperamentFilter === opt ? ' button__chip--active' : ''}`}
                        onClick={() => setTemperamentFilter(opt)}
                      >
                        {opt === ANY ? 'Any' : opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Listings */}
      <section className="section section--alt2">
        <div className="section__content">
          {filtered.length > 0 ? (
            <div className="flex-content card-grid">
              {filtered.map((cat: CatListing) => (
                <div className="cat-card flex__small--12 flex__large--4" key={cat.id}>
                  <img src={cat.image} alt={cat.name} className="cat-card__image" />
                  <div className="cat-card__body">
                    <h3 className="cat-card__name">{cat.name}</h3>
                    <p className="cat-card__meta">{cat.age} &middot; {cat.sex} &middot; {cat.temperament}</p>
                    <p className="cat-card__description">{cat.blurb}</p>
                    <a href={`/adopt/${cat.id}`} className="button cat-card__cta">
                      Meet {cat.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : hasActiveFilters ? (
            <div className="center">
              <p className="section__body">{pageHeader.empty.filtered}</p>
              <button className="full" onClick={resetFilters}>
                {pageHeader.empty.clearFilters}
              </button>
            </div>
          ) : (
            <div className="center">
              <p className="section__body">{pageHeader.empty.default}</p>
            </div>
          )}
        </div>
      </section>

      {/* Process Steps */}
      <section className="section section--alt">
        <div className="section__content center">
          <h2 className="section__title">{processSteps.title}</h2>
          <p className="section__label">{processSteps.label}</p>
          <div className="flex-content card-grid">
            {processSteps.steps.map((step) => (
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
      <section className="section">
        <div className="section__content center">
          <h2 className="section__title">{faq.title}</h2>
          {faq.groups.map((group) => (
            <div className="section__group" key={group.category}>
              <h3 className="section__group-title">{group.category}</h3>
              {group.items.map((item) => (
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
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section">
        <div className="section__content center">
          <h2 className="section__title">{footerCta.title}</h2>
          <p className="section__body">{footerCta.body}</p>
          <div className="flex-content flex--column-mobile flex--center">
            {footerCta.cta.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={['button', item.variant].filter(Boolean).join(' ')}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Adopt;