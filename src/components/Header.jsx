
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

const Header = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={`container ${styles['header-container']}`}>
        <Link to="/" className={styles.logo}>
          <img src="/Logo.svg" alt="Logo" />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles['nav-list']}>
            <li className={styles['nav-item']}>
              <Link to="/" className={`${styles['nav-link']} ${location.pathname === '/' ? styles.active : ''}`}>Home</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link to="/menu" className={`${styles['nav-link']} ${location.pathname === '/menu' ? styles.active : ''}`}>Menu</Link>
            </li>
            <li className={styles['nav-item']}>
              <span className={styles['nav-link']}>Company</span>
            </li>
            <li className={styles['nav-item']}>
              <span className={styles['nav-link']}>Login</span>
            </li>
          </ul>
        </nav>
        <button className={styles['cart-button']}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={styles['cart-badge']}>{cartCount}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
