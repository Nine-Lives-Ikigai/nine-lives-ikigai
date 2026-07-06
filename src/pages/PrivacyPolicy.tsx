import type { PrivacyData } from '../utils/data';

interface PrivacyPolicyProps {
  data: PrivacyData;
}

const PrivacyPolicy = ({ data }: PrivacyPolicyProps) => {
  const { pageHeader, sections, effectiveDate, complianceNote } = data;

  return (
    <section className="section section--0">
      <div className="section__content">
        <h1 className="section__title">{pageHeader.title}</h1>
        <p className="section__body">{pageHeader.body}</p>

        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="section__group-title">{section.title}</h2>
            <p className="section__body">{section.body}</p>
          </div>
        ))}

        <p className="section__body">This policy is effective as of {effectiveDate}.</p>
        <p className="section__body">{complianceNote}</p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;