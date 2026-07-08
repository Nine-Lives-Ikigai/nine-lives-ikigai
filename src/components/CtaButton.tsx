import type { CtaItem } from '../utils/data';

interface CtaButtonProps {
  item: CtaItem;
}

const CtaButton = ({ item }: CtaButtonProps) => (
  <a
    href={item.href}
    className={['button', item.variant].filter(Boolean).join(' ')}
  >
    {item.label}
  </a>
);

export default CtaButton;