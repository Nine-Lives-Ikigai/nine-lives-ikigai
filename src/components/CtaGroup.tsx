import type { ComponentProps } from 'react';
import CtaButton from './CtaButton';

interface CtaGroupProps {
  items: ComponentProps<typeof CtaButton>['item'][];
}

const CtaGroup = ({ items }: CtaGroupProps) => (
  <div className="flex-content flex--column-mobile flex--center">
    {items.map((item) => (
      <CtaButton key={item.href} item={item} />
    ))}
  </div>
);

export default CtaGroup;