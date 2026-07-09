interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  microdata?: boolean;
}

const AccordionItem = ({ question, answer, isOpen, onToggle, microdata = false }: AccordionItemProps) => {
  const itemProps = microdata
    ? { itemScope: true, itemProp: 'mainEntity', itemType: 'https://schema.org/Question' }
    : {};
  const questionProps = microdata ? { itemProp: 'name' } : {};

  return (
    <div className={`section__item${isOpen ? ' section__item--open' : ''}`} {...itemProps}>
      <button className="accordion-button" onClick={onToggle} aria-expanded={isOpen}>
        <span {...questionProps}>{question}</span>
        <span className="accordion-button__icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {microdata ? (
        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
          <p className="accordion-button__content" itemProp="text" hidden={!isOpen}>
            {answer}
          </p>
        </div>
      ) : (
        isOpen && <p className="accordion-button__content">{answer}</p>
      )}
    </div>
  );
};

export default AccordionItem;