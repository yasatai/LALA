import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  /** adds a small transition-delay, matching the original .1s staggered rows */
  delay?: boolean;
  className?: string;
  as?: 'div' | 'section';
}

export function Reveal({ children, delay = false, className = '', as = 'div' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as;
  const classes = [
    'reveal',
    delay ? 'reveal--delay' : '',
    visible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
