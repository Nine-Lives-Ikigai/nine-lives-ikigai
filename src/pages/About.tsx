import CtaButton from '../components/CtaButton';
import type { AboutData } from '../utils/data';

interface AboutProps {
  data: AboutData;
}

const About = ({ data }: AboutProps) => {
  const { pageHeader, mission, board, transparency, footerCta } = data;

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

      {/* Mission */}
      <section className="section section--primary">
        <div className="section__content center">
          <h2 className="section__title">{mission.title}</h2>
          <p className="section__body">{mission.body}</p>
        </div>
      </section>

      {/* Board */}
      <section className="section">
        <div className="section__content center">
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
        </div>
      </section>

      {/* Transparency */}
      <section className="section section--primary">
        <div className="section__content center">
          <h2 className="section__title">{transparency.title}</h2>
          <p className="section__body">{transparency.body}</p>
          {transparency.cta && (
            <a href={transparency.cta.href} className="button button--alt">
              {transparency.cta.label}
            </a>
          )}
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

export default About;