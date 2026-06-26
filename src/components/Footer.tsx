import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import ThemedImage from './ThemedImage';

const Footer = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles['footer-top']}>
          <div className={styles['footer-brand']}>
            <a href="/" className={`${styles.logo} ${styles['footer-logo']}`}>
              <ThemedImage name="Logo.svg" alt={t('footer.logoAlt')} className={styles['footer-logo']} />
            </a>
            <p className={styles['footer-description']}>
              {t('footer.brand.description')}
            </p>
          </div>
          <div className={styles['footer-columns']}>
            <div className={styles['footer-column']}>
              <h4 className={styles['footer-heading']}>{t('footer.company.heading')}</h4>
              <ul className={styles['footer-list']}>
                <li><span>{t('footer.company.home')}</span></li>
                <li><span>{t('footer.company.order')}</span></li>
                <li><span>{t('footer.company.faq')}</span></li>
                <li><span>{t('footer.company.contact')}</span></li>
              </ul>
            </div>
            <div className={styles['footer-column']}>
              <h4 className={styles['footer-heading']}>{t('footer.template.heading')}</h4>
              <ul className={styles['footer-list']}>
                <li><a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">{t('footer.template.styleGuide')}</a></li>
                <li><a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">{t('footer.template.changelog')}</a></li>
                <li><a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">{t('footer.template.licence')}</a></li>
                <li><a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">{t('footer.template.webflowUniversity')}</a></li>
              </ul>
            </div>
            <div className={styles['footer-column']}>
              <h4 className={styles['footer-heading']}>{t('footer.flowbase.heading')}</h4>
              <ul className={styles['footer-list']}>
                <li><span>{t('footer.flowbase.moreCloneables')}</span></li>
                <li>
                  <div
                    className={styles['phone-container']}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <span className={styles['phone-word']}>{t('footer.flowbase.phone')}</span>
                    {showTooltip && <div className={styles.tooltip}><img src="/phone-tooltip.svg" alt={t('footer.flowbase.phoneAlt')} className={styles['tooltip-img']} /></div>}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles['footer-bottom']}>
          <p className={styles.copyright}>
            {t('footer.bottom.builtBy')} <a href="#" className={styles['flowbase-link']}>{t('footer.bottom.flowbase')}</a>. {t('footer.bottom.poweredBy')} <a href="#" className={styles['webflow-link']}>{t('footer.bottom.webflow')}</a>
          </p>
          <div className={styles['social-links']}>
            <a href="#" className={styles['social-link']}><img src="https://img.icons8.com/material-outlined/24/333333/instagram-new.png" alt={t('footer.social.instagram')} /></a>
            <a href="#" className={styles['social-link']}><img src="https://img.icons8.com/material-outlined/24/333333/twitter-squared.png" alt={t('footer.social.twitter')} /></a>
            <a href="#" className={styles['social-link']}><img src="https://img.icons8.com/material-outlined/24/333333/youtube-play.png" alt={t('footer.social.youtube')} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
