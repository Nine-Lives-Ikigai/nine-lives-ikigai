import CtaGroup from '../components/CtaGroup';
import PageSection from '../components/PageSection';
import type { FosterData } from '../utils/data';

interface FosterProps {
  data: FosterData;
}

const Foster = ({ data }: FosterProps) => {
  const { pageHeader, whatYouProvide, whatWeProvide, footerCta } = data;

  return (
    <>
      {/* Page Header */}
      <PageSection variant="hero">
        <h1 className="section__title">{pageHeader.title}</h1>
        <p className="section__label">{pageHeader.label}</p>
        <p className="section__body">{pageHeader.body}</p>
      </PageSection>

      {/* What Fostering Involves */}
      <PageSection variant="primary">
        <h2 className="section__title">{whatYouProvide.title}</h2>
        <div className="flex-content card-grid">
          {whatYouProvide.items.map((item) => (
            <div className="service-card service-card--short flex__small--12 flex__large--4" key={item.title}>
              <h3 className="service-card__title">{item.title}</h3>
              <p className="service-card__description">{item.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* What We Provide */}
      <PageSection>
        <h2 className="section__title">{whatWeProvide.title}</h2>
        <div className="flex-content card-grid">
          {whatWeProvide.items.map((item) => (
            <div className="service-card service-card--short flex__small--12 flex__large--4" key={item.title}>
              <h3 className="service-card__title">{item.title}</h3>
              <p className="service-card__description">{item.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Footer CTA */}
      <PageSection>
        <h2 className="section__title">{footerCta.title}</h2>
        <CtaGroup items={footerCta.cta} />
      </PageSection>
    </>
  );
};

export default Foster;