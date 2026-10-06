import CtaGroup from '../components/CtaGroup';
import PageSection from '../components/PageSection';
import type { DonateData } from '../utils/data';

interface DonateProps {
  data: DonateData;
}

const Donate = ({ data }: DonateProps) => {
  const { pageHeader, embed, disclosure, otherWays, footerCta } = data;

  return (
    <>
      {/* Page Header */}
      <PageSection variant="hero">
        <h1 className="section__title">{pageHeader.title}</h1>
        <p className="section__label">{pageHeader.label}</p>
        <p className="section__body">{pageHeader.body}</p>
      </PageSection>

      {/* Donation Form (Shelterluv checkout) */}
      <PageSection variant="primary">
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
      </PageSection>

      {/* Tax-deductibility disclosure */}
      {disclosure && (
        <PageSection>
          <p className="section__body">{disclosure}</p>
        </PageSection>
      )}

      {/* Other Ways to Give */}
      <PageSection variant="primary">
        <h2 className="section__title">{otherWays.title}</h2>
        <p className="section__label">{otherWays.label}</p>
        <div className="flex-content card-grid">
          {otherWays.items.map((item) => {
            const isExternal = item.cta?.href?.startsWith('http') ?? false;
            return (
              <div className="service-card flex__small--12 flex__large--4" key={item.title}>
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
      </PageSection>

      {/* Footer CTA */}
      <PageSection>
        <h2 className="section__title">{footerCta.title}</h2>
        <CtaGroup items={footerCta.cta} />
      </PageSection>
    </>
  );
};

export default Donate;