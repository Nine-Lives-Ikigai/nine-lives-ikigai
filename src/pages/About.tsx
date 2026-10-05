import CtaGroup from '../components/CtaGroup';
import PageSection from '../components/PageSection';
import type { AboutData } from '../utils/data';

interface AboutProps {
  data: AboutData;
}

const About = ({ data }: AboutProps) => {
  const { pageHeader, mission, board, transparency, footerCta } = data;

  return (
    <>
      {/* Page Header */}
      <PageSection variant="hero">
        <h1 className="section__title">{pageHeader.title}</h1>
        <p className="section__label">{pageHeader.label}</p>
        <p className="section__body">{pageHeader.body}</p>
      </PageSection>

      {/* Mission */}
      <PageSection variant="primary">
        <h2 className="section__title">{mission.title}</h2>
        <p className="section__body">{mission.body}</p>
      </PageSection>

      {/* Board */}
      <PageSection>
        <h2 className="section__title">{board.title}</h2>
        <p className="section__label">{board.label}</p>
        <div className="flex-content card-grid">
          {board.members.map((member) => (
            <div className="service-card service-card--short flex__small--12 flex__large--4" key={member.name}>
              <h3 className="service-card__title">{member.name}</h3>
              <p className="service-card__description">{member.title}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Transparency */}
      <PageSection variant="primary">
        <h2 className="section__title">{transparency.title}</h2>
        <p className="section__body">{transparency.body}</p>
        {transparency.cta && (
          <a href={transparency.cta.href} className="button button--alt">
            {transparency.cta.label}
          </a>
        )}
      </PageSection>

      {/* Footer CTA */}
      <PageSection>
        <h2 className="section__title">{footerCta.title}</h2>
        <p className="section__body">{footerCta.body}</p>
        <CtaGroup items={footerCta.cta} />
      </PageSection>
    </>
  );
};

export default About;