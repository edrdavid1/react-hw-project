import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';
import clsx from 'clsx';
import ThemedImage from './ThemedImage';

const RATING = 4.8;
const MAX_STARS = 5;

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className={styles.stars}>
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <span
          key={i}
          className={clsx({ [styles['star-filled']]: i < Math.round(rating), [styles['star-empty']]: i >= Math.round(rating) })}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={clsx('container', styles['hero-container'])}>
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>
            {t('hero.titlePrefix')} <span className={styles.highlight}>{t('hero.titleHighlight')}</span> {t('hero.titleSuffix')}
          </h1>
          <p className={styles['hero-description']}>
            {t('hero.description')}
          </p>
          <Link to="/menu" className={styles['cta-button']}>{t('hero.button')}</Link>
          <div className={styles.trustpilot}>
            <div className={styles['trustpilot-header']}>
              <StarRating rating={RATING} />
              <span className={styles['trustpilot-text']}>{t('hero.trustpilot')}</span>
            </div>
            <p className={styles['trustpilot-rating']}>
              <span className={styles['rating-score']}>{t('hero.ratingReviews', { rating: RATING, count: 2000 })}</span>
            </p>
          </div>
        </div>
        <div className={styles['hero-image-container']}>
          <ThemedImage
            name="IMAGE.png"
            alt={t('hero.imageAlt')}
            className={styles['hero-main-image']}
          />
          <div className={styles['floating-icons']}>
            <div className={clsx(styles['icon-badge'], styles.google)}>
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
            </div>
            <div className={clsx(styles['icon-badge'], styles['phone-app'])}>
              <img src="https://img.icons8.com/color/48/000000/iphone.png" alt="App" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
