import { company } from '../../data/lala';
import { HammerIcon, HomeIcon, MailIcon, PhoneIcon } from '../LalaIcons';
import styles from './BottomNavigation.module.css';

interface BottomNavigationProps {
  currentPath: string;
}

const items = [
  { href: '/#top', label: 'トップ', path: '/', icon: HomeIcon },
  { href: '/services', label: 'サービス', path: '/services', icon: HammerIcon },
  {
    href: `tel:${company.phone.replaceAll('-', '')}`,
    label: '電話',
    path: '',
    icon: PhoneIcon,
    action: true,
  },
  { href: '/contact', label: '無料相談', path: '/contact', icon: MailIcon, action: true },
] as const;

export function BottomNavigation({ currentPath }: BottomNavigationProps) {
  return (
    <nav className={styles.navigation} aria-label="スマートフォン用ボトムナビゲーション">
      <div className={styles.inner}>
        {items.map((item) => {
          const active = item.path !== '' && currentPath === item.path;
          const Icon = item.icon;

          return (
            <a
              key={item.href}
              className={`${styles.item} ${'action' in item && item.action ? styles.action : ''} ${active ? styles.active : ''}`}
              href={item.href}
              aria-current={active ? 'page' : undefined}
            >
              <Icon />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
