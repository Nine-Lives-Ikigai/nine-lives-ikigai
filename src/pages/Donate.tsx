import CtaButton from '../components/CtaButton';
import type { DonateData } from '../utils/data';

interface DonateProps {
  data: DonateData;
}

const Donate = ({ data }: DonateProps) => {
  const { pageHeader, embed, disclosure, otherWays, footerCta } = data;

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

      {/* Donation Form (Shelterluv checkout) */}
      <section className="section section--primary">
        <div className="section__content center">
          <iframe
            src={embed.src}
            title={embed.title}
            className="section__embed-frame"
            style={{ height: embed.height }}
            loading="lazy"
            allowFullScreen
          />
          {/* Fallback: a blocked or failed iframe renders as an empty box with no visible error. */}
          <p className="section__body">
            <a
              href={embed.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${embed.fallbackLabel} — opens in a new tab`}
            >
              {embed.fallbackLabel}
            </a>
          </p>
          {embed.note && (
            <p className="section__body">
              {embed.note}{' '}
              <a href={embed.privacyLinkHref}>{embed.privacyLinkLabel ?? 'Privacy Policy'}</a>.
            </p>
          )}
        </div>
      </section>

      {/* Tax-deductibility disclosure */}
      {disclosure && (
        <section className="section">
          <div className="section__content center">
            <p className="section__body">{disclosure}</p>
          </div>
        </section>
      )}

      {/* Other Ways to Give */}
      <section className="section section--primary">
        <div className="section__content center">
          <h2 className="section__title">{otherWays.title}</h2>
          <p className="section__label">{otherWays.label}</p>
          <div className="flex-content card-grid">
            {otherWays.items.map((item) => {
              const isExternal = item.cta?.href?.startsWith('http') ?? false;
              return (
                <div className="service-card service-card--tall flex__small--12 flex__large--4" key={item.title}>
                  <h3 className="service-card__title">{item.title}</h3>
                  <p className="service-card__description">{item.description}</p>
                  {item.cta && (
                    <a
                      href={item.cta.href ?? undefined}
                      className="button service-card__button cat-card__cta"
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={isExternal ? `${item.cta.label} — opens in a new tab` : item.cta.label}
                    >
                      {item.cta.label}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section">
        <div className="section__content center">
          <h2 className="section__title">{footerCta.title}</h2>
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

export default Donate;