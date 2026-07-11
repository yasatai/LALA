import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** optional supporting line under the title */
  note?: string;
  /** override colors for dark sections (Voice) */
  dark?: boolean;
}

export function SectionHeading({ eyebrow, title, note, dark = false }: SectionHeadingProps) {
  return (
    <Reveal className="heading-block">
      <div className="eyebrow" style={dark ? { color: 'var(--gold-light)' } : undefined}>
        {eyebrow}
      </div>
      <h2 className="heading" style={dark ? { color: '#fff' } : undefined}>
        {title}
      </h2>
      {note && (
        <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>{note}</p>
      )}
    </Reveal>
  );
}
