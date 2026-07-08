import { useMemo, useState } from 'react';
import { CatListing } from '../utils/cat';
import CatCard from '../components/CatCard';
import CtaButton from '../components/CtaButton';
import FilterGroup from '../components/FilterGroup';
import { ANY, type FilterValue } from '../utils/filters';
import type { AdoptData } from '../utils/data';

interface AdoptProps {
  data: AdoptData;
}

const Adopt = ({ data }: AdoptProps) => {
  const { pageHeader, processSteps, faq, footerCta, cats, catFilters } = data;

  // sexOptions has no canonical source — catFilters has no "sexes" list —
  // so it's derived straight from the cat records.
  const sexOptions = useMemo(
    () => Array.from(new Set(cats.map((cat) => cat.sex))),
    [cats]
  );

  // ageOptions and temperamentOptions do have a canonical list in
  // catFilters, but showing every possible value regardless of whether any
  // cat currently has it means most chips lead nowhere (catFilters.temperaments
  // defines 24 possible values; the current cats only use 2). Filtering the
  // canonical list down to values actually present keeps catFilters'
  // intended ordering while dropping the dead options.
  const ageOptions = useMemo(
    () => catFilters.ages.filter((age) => cats.some((cat) => cat.age === age)),
    [cats, catFilters.ages]
  );

  const temperamentOptions = useMemo(
    () => catFilters.temperaments.filter((t) => cats.some((cat) => cat.temperament === t)),
    [cats, catFilters.temperaments]
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
      <section className="section section--hero">
        <div className="section__content center">
          <h1 className="section__title">{pageHeader.title}</h1>
          <p className="section__label">{pageHeader.label}</p>
          <p className="section__body">{pageHeader.body}</p>
        </div>
      </section>

      {/* Filter */}
      <section className="section section--dark">
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
                <FilterGroup
                  label="Age"
                  anyLabel="Any age"
                  options={ageOptions}
                  value={ageFilter}
                  onChange={setAgeFilter}
                />
                <FilterGroup
                  label="Sex"
                  anyLabel="Any"
                  options={sexOptions}
                  value={sexFilter}
                  onChange={setSexFilter}
                />
                <FilterGroup
                  label="Temperament"
                  anyLabel="Any"
                  options={temperamentOptions}
                  value={temperamentFilter}
                  onChange={setTemperamentFilter}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Listings */}
      <section className="section">
        <div className="section__content">
          {filtered.length > 0 ? (
            <div className="flex-content card-grid">
              {filtered.map((cat: CatListing) => (
                <CatCard key={cat.id} cat={cat} showTemperament />
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
      <section className="section section--primary">
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
              <CtaButton key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Adopt;