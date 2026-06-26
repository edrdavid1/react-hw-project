import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { clearAuthError, registerUser } from '../store/slices/authSlice';
import styles from './LoginPage.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearAuthError());
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError(t('register.errors.passwordMismatch'));
      return;
    }

    try {
      await dispatch(registerUser({ email, password })).unwrap();
      navigate('/orders');
    } catch {
      return;
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles['hero-title']}>{t('register.title')}</h1>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.card}>
          {(error || localError) && <p className={styles.error}>{error ?? localError}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>{t('register.email')}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder={t('register.placeholderEmail')}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>{t('register.password')}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder={t('register.placeholderPassword')}
                required
                minLength={6}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword" className={styles.label}>{t('register.confirmPassword')}</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                placeholder={t('register.placeholderPassword')}
                required
                minLength={6}
              />
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? t('register.loading') : t('register.submit')}
              </button>
              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setLocalError(null);
                  dispatch(clearAuthError());
                }}
              >
                {t('register.cancel')}
              </button>
            </div>

            <p className={styles.switchText}>
              {t('register.alreadyHaveAccount')}{' '}
              <Link to="/login" className={styles.switchLink}>
                {t('register.loginLink')}
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
