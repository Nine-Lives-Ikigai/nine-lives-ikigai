import type { CtaItem } from '../utils/data';

interface CtaButtonProps {
  item: CtaItem;
}

const CtaButton = ({ item }: CtaButtonProps) => {
  const isExternal = item?.href?.startsWith('http') ?? false;
  
  return (<a
    href={item.href ?? undefined}
    className={['button', item.variant].filter(Boolean).join(' ')}
    target={isExternal ? '_blank' : undefined}
    rel={isExternal ? 'noopener noreferrer' : undefined}
    aria-label={isExternal ? `${item.label} — opens in a new tab` : item.label}
  >
    {item.label}
  </a>
)};

export default CtaButton;