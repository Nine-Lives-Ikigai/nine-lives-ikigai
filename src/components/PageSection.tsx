import type { ComponentPropsWithoutRef } from 'react';

interface PageSectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'className'> {
  variant?: 'hero' | 'primary';
  center?: boolean;
}

const PageSection = ({ variant, center = true, children, ...rest }: PageSectionProps) => (
  <section className={`section${variant ? ` section--${variant}` : ''}`} {...rest}>
    <div className={`section__content${center ? ' center' : ''}`}>{children}</div>
  </section>
);

export default PageSection;