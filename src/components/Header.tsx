import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import clsx from 'clsx';
import { useAppSelector } from '../store/hooks';
import { useTheme } from '../context/useTheme';
import ThemedImage from './ThemedImage';
import LanguageDropdown from './LanguageDropdown';

const Header = () => {
  const cartCount = useAppSelector((state) => state.cart.cartCount);
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={clsx('container', styles['header-container'])}>
        <Link to="/" className={styles.logo}>
          <ThemedImage name="Logo.svg" alt={t('header.logoAlt')} className={styles.logoImage} />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles['nav-list']}>
            <li className={styles['nav-item']}>
              <Link to="/" className={clsx(styles['nav-link'], { [styles.active]: location.pathname === '/' })}>{t('header.nav.home')}</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link to="/menu" className={clsx(styles['nav-link'], { [styles.active]: location.pathname === '/menu' })}>{t('header.nav.menu')}</Link>
            </li>
            <li className={styles['nav-item']}>
              <span className={styles['nav-link']}>{t('header.nav.company')}</span>
            </li>
            <li className={styles['nav-item']}>
              {user ? (
                <Link to="/cart" className={clsx(styles['nav-link'], { [styles.active]: location.pathname === '/cart' })}>{t('header.nav.cart')}</Link>
              ) : (
                <Link to="/login" className={clsx(styles['nav-link'], { [styles.active]: location.pathname === '/login' })}>{t('header.nav.login')}</Link>
              )}
            </li>
          </ul>
        </nav>
        <div className={styles['header-controls']}>
          <LanguageDropdown />
          <Link to="/cart" className={styles['cart-button']} aria-label={t('header.nav.cart')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles['cart-badge']}>{cartCount}</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

const ThemeToggle = () => {
  const { t } = useTranslation();
  const { effectiveTheme, toggleTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  return (
    <button
      className={styles['theme-toggle']}
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      title={isDark ? t('theme.light') : t('theme.dark')}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5L3.5 3.5M20.5 20.5L19 19M5 19L3.5 20.5M20.5 3.5L19 5" stroke="var(--text-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" stroke="var(--text-color)" strokeWidth="1.5"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="var(--text-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
};

export default Header;
