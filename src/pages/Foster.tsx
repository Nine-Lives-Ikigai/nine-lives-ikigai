import type { FosterData } from '../utils/data';

interface FosterProps {
  data: FosterData;
}

const Foster = ({ data }: FosterProps) => {
  const { pageHeader, whatYouProvide, whatWeProvide, footerCta } = data;

  return (
    <>
      {/* Page Header */}
      <section className="section section--0">
        <div className="section__content center">
          <h1 className="section__title">{pageHeader.title}</h1>
          <p className="section__label">{pageHeader.label}</p>
          <p className="section__body">{pageHeader.body}</p>
        </div>
      </section>

      {/* What Fostering Involves */}
      <section className="section section--alt">
        <div className="section__content center">
          <h2 className="section__title">{whatYouProvide.title}</h2>
          <div className="flex-content card-grid">
            {whatYouProvide.items.map((item) => (
              <div className="service-card service-card--short flex__small--12 flex__large--4" key={item.title}>
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="section">
        <div className="section__content center">
          <h2 className="section__title">{whatWeProvide.title}</h2>
          <div className="flex-content card-grid">
            {whatWeProvide.items.map((item) => (
              <div className="service-card service-card--short flex__small--12 flex__large--4" key={item.title}>
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section section--alt">
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

export default Foster;