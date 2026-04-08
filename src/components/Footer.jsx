
import { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles['footer-top']}>
          <div className={styles['footer-brand']}>
            <a href="/" className={`${styles.logo} ${styles['footer-logo']}`}>
              <img src="/logo.svg" alt="Logo" />
            </a>
            <p className={styles['footer-description']}>
              Takeaway & Delivery template for small - medium businesses.
            </p>
          </div>
          <div className={styles['footer-columns']}>
            <div className={styles['footer-column']}>
              <h4 className={styles['footer-heading']}>COMPANY</h4>
              <ul className={styles['footer-list']}>
                <li><a href="/">Home</a></li>
                <li><a href="/order">Order</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className={styles['footer-column']}>
              <h4 className={styles['footer-heading']}>TEMPLATE</h4>
              <ul className={styles['footer-list']}>
                <li><a href="/styleguide">Style Guide</a></li>
                <li><a href="/changelog">Changelog</a></li>
                <li><a href="/licence">Licence</a></li>
                <li><a href="/webflow">Webflow University</a></li>
              </ul>
            </div>
            <div className={styles['footer-column']}>
              <h4 className={styles['footer-heading']}>FLOWBASE</h4>
              <ul className={styles['footer-list']}>
                <li><a href="/more">More Cloneables</a></li>
                <li>
                  <div 
                    className={styles['phone-container']}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <span className={styles['phone-word']}>phone</span>
                    {showTooltip && <div className={styles.tooltip}><img src="/phone-tooltip.svg" alt="Phone number" className={styles['tooltip-img']} /></div>}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles['footer-bottom']}>
          <p className={styles.copyright}>
            Built by <a href="#" className={styles['flowbase-link']}>Flowbase</a>. Powered by <a href="#" className={styles['webflow-link']}>Webflow</a>
          </p>
          <div className={styles['social-links']}>
            <a href="#" className={styles['social-link']}><img src="https://img.icons8.com/material-outlined/24/333333/instagram-new.png" alt="Instagram" /></a>
            <a href="#" className={styles['social-link']}><img src="https://img.icons8.com/material-outlined/24/333333/twitter-squared.png" alt="Twitter" /></a>
            <a href="#" className={styles['social-link']}><img src="https://img.icons8.com/material-outlined/24/333333/youtube-play.png" alt="YouTube" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
