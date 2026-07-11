export interface NavLink {
  href: string;
  label: string;
  /** longer label used in the mobile dropdown */
  longLabel?: string;
}

export const navLinks: NavLink[] = [
  { href: '#service-link', label: 'サービス', longLabel: 'サービス紹介' },
  { href: '#riyuu-link', label: '選ばれる理由' },
  { href: '#sekou-link', label: '施工事例' },
  { href: '#koe-link', label: 'お客様の声' },
  { href: '#meyasu-link', label: '費用目安', longLabel: '塗装費用の目安' },
  { href: '#faq-link', label: 'FAQ', longLabel: 'よくある質問' },
];
