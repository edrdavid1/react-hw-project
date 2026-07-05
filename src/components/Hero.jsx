
import styles from './Hero.module.css';
import { Link } from 'react-router-dom';

const RATING = 4.8;
const MAX_STARS = 5;

const StarRating = ({ rating }) => {
  return (
    <div className={styles.stars}>
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <span
          key={i}
          className={i < Math.round(rating) ? styles['star-filled'] : styles['star-empty']}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles['hero-container']}`}>
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>
            Beautiful food & takeaway, <span className={styles.highlight}>delivered</span> to your door.
          </h1>
          <p className={styles['hero-description']}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
          </p>
          <button className={styles['cta-button']} disabled>Place an Order</button>
          <div className={styles.trustpilot}>
            <div className={styles['trustpilot-header']}>
              <StarRating rating={RATING} />
              <span className={styles['trustpilot-text']}>Trustpilot</span>
            </div>
            <p className={styles['trustpilot-rating']}>
              <span className={styles['rating-score']}>{RATING} out of 5</span> based on 2000+ reviews
            </p>
          </div>
        </div>
        <div className={styles['hero-image-container']}>
          <img 
            src="/IMAGE.png" 
            alt="Delicious food" 
            className={styles['hero-main-image']} 
          />
          <div className={styles['floating-icons']}>
            <div className={`${styles['icon-badge']} ${styles.google}`}>
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
            </div>
            <div className={`${styles['icon-badge']} ${styles['phone-app']}`}>
              <img src="https://img.icons8.com/color/48/000000/iphone.png" alt="App" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
