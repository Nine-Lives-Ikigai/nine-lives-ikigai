import { useState } from 'react';
import type { ContactData } from '../utils/data';

interface ContactProps {
  data: ContactData;
}

// TODO: replace with the actual form submission endpoint (e.g. Formspree, Netlify Forms, or a serverless function)
const FORM_ENDPOINT_URL = 'https://REPLACE_WITH_FORM_ENDPOINT';

const Contact = ({ data }: ContactProps) => {
  const { pageHeader, form, info, faq, footerCta } = data;

  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(form.errorMessage ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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

      {/* Contact Form + Info */}
      <section className="section section--alt">
        <div className="section__content">
          <div className="flex-content flex--column-mobile">
            {/* Form */}
            <div className="flex__small--12 flex__large--7">
              {submitted ? (
                <div className="center">
                  <p className="section__body">{form.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <p className="section__body" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="flex-content flex--column-mobile">
                    {form.fields.map((field) => (
                      <div
                        className={`flex__small--12 ${field.half ? 'flex__large--6' : ''}`}
                        key={field.name}
                      >
                        <label className="section__label" htmlFor={field.name}>
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            rows={5}
                            value={values[field.name] ?? ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            aria-label={field.label}
                            value={values[field.name] ?? ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          >
                            <option value="" disabled>
                              {field.placeholder}
                            </option>
                            {field.options?.map((opt) => (
                              <option value={opt} key={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={values[field.name] ?? ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {form.privacyNote && (
                    <p className="section__body">
                      {form.privacyNote}{' '}
                      <a href="/privacy-policy">{form.privacyLinkLabel ?? 'Privacy Policy'}</a>.
                    </p>
                  )}
                  <button type="submit" className="full" disabled={submitting}>
                    {submitting ? 'Sending…' : form.submitLabel}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="flex__small--12 flex__large--5">
              <h2 className="section__title">{info.title}</h2>
              {info.items.map((item) => (
                <div className="section__group" key={item.label}>
                  <h3 className="section__group-title">{item.label}</h3>
                  <p className="section__body">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq && (
        <section className="section section--33" itemScope itemType="https://schema.org/FAQPage">
          <div className="section__content center">
            <h2 className="section__title">{faq.title}</h2>
            {faq.items.map((item) => (
              <div
                className={`section__item${openFaq === item.question ? ' section__item--open' : ''}`}
                key={item.question}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="accordion-button"
                  onClick={() => setOpenFaq(openFaq === item.question ? null : item.question)}
                  aria-expanded={openFaq === item.question}
                >
                  <span itemProp="name">{item.question}</span>
                  <span className="accordion-button__icon" aria-hidden="true">
                    {openFaq === item.question ? '−' : '+'}
                  </span>
                </button>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p
                    className="accordion-button__content"
                    itemProp="text"
                    hidden={openFaq !== item.question}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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

export default Contact;