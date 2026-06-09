import { useState } from 'react';
import { CatListing } from '../utils/cat';

type AgeFilter = 'all' | 'kitten' | 'adult' | 'senior';
type SexFilter = 'all' | 'male' | 'female';
type TemperamentFilter = 'all' | 'social' | 'independent' | 'bonded pair';

interface AdoptProps {
  data: { cats: CatListing[] };
}

const PAGE_HEADER = {
  title: 'Find Your Cat',
  label: 'Every cat here is ready for their next chapter.',
  body: 'Each listing below is a cat in our care: fostered, loved, and waiting. Take your time. The right match is worth it.',
  empty: {
    filtered: 'No cats match your current filters.',
    clearFilters: 'Clear filters',
    default: 'No cats are available for adoption. Please check back later.',
  },
};

const PROCESS_STEPS = {
  title: 'How It Works',
  label: 'Four steps to bringing your cat home',
  steps: [
    {
      number: '01',
      title: 'Apply',
      description:
        "Complete our adoption application. Tell us about your home, lifestyle, and the kind of cat you're hoping to find.",
    },
    {
      number: '02',
      title: 'Meet Your Match',
      description:
        "We'll introduce you to cats whose temperament and needs fit your home. Visits are relaxed and unhurried. We let the cat set the pace.",
    },
    {
      number: '03',
      title: 'Quick Check-in',
      description:
        'A brief call or video chat to confirm the setup and answer any last questions before your cat comes home.',
    },
    {
      number: '04',
      title: 'Settle In',
      description:
        "Your cat comes home with a starter pack and guidance for the first few weeks. We're available whenever questions come up: before, during, and after the transition.",
    },
  ],
};

const FAQ = {
  title: 'Frequently Asked Questions',
  groups: [
    {
      category: 'Adoption Fee',
      items: [
        {
          question: 'What is the adoption fee?',
          answer: "Fees vary by cat and cover spay/neuter, vaccinations, microchipping, and a veterinary health check. Specific fees are listed on each cat's profile.",
        },
        {
          question: 'Are fees different for kittens vs. adult vs. senior cats?',
          answer: 'Yes. Kittens carry a higher fee; adult cats are mid-range; senior cats (8+) are reduced. Exact amounts are listed on each profile.',
        },
        {
          question: 'Are fees waived or discounted for special needs cats?',
          answer: 'Special needs cats are adopted at a reduced fee. In some cases fees are waived entirely. Check individual profiles for details.',
        },
        {
          question: 'Do you offer senior-for-senior discounts?',
          answer: 'Yes. Adopters 65 or older adopting a senior cat qualify for a waived adoption fee.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept card, cash, and online payment at the time of adoption.',
        },
      ],
    },
    {
      category: 'Process & Timeline',
      items: [
        {
          question: 'How long does the process take?',
          answer: 'Most adoptions are completed within one to two weeks from application to welcome home.',
        },
        {
          question: 'Can I reserve or hold a cat while I apply?',
          answer: 'We can place a short hold on a cat once your application is under review. Contact us to arrange this.',
        },
        {
          question: 'Can I adopt same-day?',
          answer: 'Same-day adoption is not available. The application and check-in steps ensure every placement is the right fit.',
        },
        {
          question: 'What happens if the cat I want is adopted before I am approved?',
          answer: "We'll work with you to find another match. Your application stays active and we'll be in touch as soon as a suitable cat is available.",
        },
        {
          question: 'How will I be contacted after I apply?',
          answer: 'By email within 2-3 business days of submission.',
        },
      ],
    },
    {
      category: 'Requirements',
      items: [
        {
          question: 'Do I need to be a homeowner?',
          answer: 'No. Renters are welcome provided they have documented landlord approval for cats.',
        },
        {
          question: "What if my landlord approval isn't in writing?",
          answer: 'Written landlord approval, a signed letter or email, is required before adoption is finalized. Verbal confirmation is not accepted.',
        },
        {
          question: 'Is there an age requirement for adopters?',
          answer: 'Adopters must be 21 or older. Nine Lives Ikigai operates in California; all adoptions are subject to California law.',
        },
        {
          question: 'Do children in the home need to meet the cat first?',
          answer: "Children 15 and under must meet the cat before adoption is finalized. We'll arrange this during the meet step.",
        },
        {
          question: 'Do my existing pets need to be spayed or neutered?',
          answer: 'Yes. Any cats currently in the household must be spayed or neutered prior to adoption.',
        },
        {
          question: 'Do you have a non-discrimination policy?',
          answer: 'Yes. We do not discriminate on the basis of race, color, religion, sex, gender identity, sexual orientation, national origin, age, disability, or any other characteristic protected by law. This applies to all adoption services and programs.',
        },
      ],
    },
    {
      category: 'After Adoption',
      items: [
        {
          question: 'Do your cats come vaccinated, microchipped, and spayed/neutered?',
          answer: 'Yes. All cats are spayed or neutered, up to date on age-appropriate vaccinations, and microchipped before coming home.',
        },
        {
          question: 'What support do you offer after adoption?',
          answer: 'We remain available by phone and email for as long as you need us. Your starter pack includes care guidance for the first few weeks.',
        },
        {
          question: 'What does the starter pack include?',
          answer: "Food for the first few days, litter, a carrier liner, and your cat's veterinary history and records.",
        },
        {
          question: 'Can I meet a cat more than once before deciding?',
          answer: 'Yes. We encourage it for cats that need more time to warm up.',
        },
        {
          question: 'Do you offer any veterinary assistance after adoption?',
          answer: "We run a veterinary assistance program for cats in need. If you're facing unexpected medical costs after adoption, contact us. We may be able to help.",
        },
      ],
    },
    {
      category: 'Fit & Compatibility',
      items: [
        {
          question: 'Do you have cats that are good with dogs?',
          answer: "Some of our cats are dog-tested and listed as dog-friendly on their profiles. We'll flag this during matching.",
        },
        {
          question: 'Do you require indoor-only adoption?',
          answer: 'Yes. All cats are adopted to indoor-only homes.',
        },
        {
          question: "What if the cat isn't getting along with my other pets?",
          answer: "Contact us. We'll provide guidance first. If the placement isn't working, we'll help arrange a return and work toward a better match.",
        },
      ],
    },
    {
      category: 'Returns',
      items: [
        {
          question: "What if it's not the right fit?",
          answer: 'Per your adoption agreement, we ask that you return the cat to us rather than rehome independently. Finding the right match matters more than any single placement.',
        },
        {
          question: 'Is there a trial period?',
          answer: 'There is no formal trial period, but we stay closely in touch during the first two weeks and will help troubleshoot any issues that come up.',
        },
        {
          question: 'What if my circumstances change after adoption?',
          answer: "Contact us. Whether it's a move, allergies, or a change in household, we'll work with you on the best path forward for the cat.",
        },
      ],
    },
  ],
};

const FOOTER_CTA = {
  title: 'Not ready to adopt?',
  body: 'Fostering and donating make every adoption possible.',
  cta: [
    { label: 'Donate', href: '/donate', variant: 'button' },
    { label: 'Become a Foster', href: '/foster', variant: 'button--alt2' },
  ],
};

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
        <div className="section__content center">
          <h1 className="section__title">{PAGE_HEADER.title}</h1>
          <p className="section__label">{PAGE_HEADER.label}</p>
          <p className="section__body">{PAGE_HEADER.body}</p>
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
            {filtersOpen ? 'Hide Filters' : hasActiveFilters ? 'Edit Filters' : 'Filter'}
          </button>
          {filtersOpen && (
            <div className="filters__controls filters__controls--open">
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
          )}
        </div>
      </section>

      {/* Listings Grid */}
      <section className="section section--alt2">
        <div className="section__content">
          {filtered.length > 0 ? (
            <div className="flex-content card-grid">
              {filtered.map((cat) => (
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
              <p className="section__body">{PAGE_HEADER.empty.filtered}</p>
              <button className="full" onClick={resetFilters}>
                {PAGE_HEADER.empty.clearFilters}
              </button>
            </div>
          ) : (
            <div className="center">
              <p className="section__body">{PAGE_HEADER.empty.default}</p>
            </div>
          )}
        </div>
      </section>

      {/* Adoption Process */}
      <section className="section section--alt">
        <div className="section__content center">
          <h2 className="section__title">{PROCESS_STEPS.title}</h2>
          <p className="section__label">{PROCESS_STEPS.label}</p>
          <div className="flex-content card-grid">
            {PROCESS_STEPS.steps.map((step) => (
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
          <h2 className="section__title">{FAQ.title}</h2>
          {FAQ.groups.map((group) => (
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

      {/* CTA Footer Band */}
      <section className="section">
        <div className="section__content center">
          <h2 className="section__title">{FOOTER_CTA.title}</h2>
          <p className="section__body">{FOOTER_CTA.body}</p>
          <div className="flex-content flex--column-mobile flex--center">
            {FOOTER_CTA.cta.map((item) => (
              <a key={item.href} href={item.href} className={['button', item.variant].filter(Boolean).join(' ')}>{item.label}</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Adopt;