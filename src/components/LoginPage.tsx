import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { clearAuthError, loginUser } from '../store/slices/authSlice';
import styles from './LoginPage.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearAuthError());

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/cart');
    } catch {
      return;
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles['hero-title']}>{t('login.title')}</h1>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.card}>
          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>{t('login.email')}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder={t('login.placeholderEmail')}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>{t('login.password')}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder={t('login.placeholderPassword')}
                required
                minLength={6}
              />
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? t('login.loading') : t('login.submit')}
              </button>
              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  dispatch(clearAuthError());
                }}
              >
                {t('login.cancel')}
              </button>
            </div>

            <p className={styles.switchText}>
              {t('login.noAccount')} {' '}
              <Link to="/register" className={styles.switchLink}>
                {t('login.createOne')}
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
