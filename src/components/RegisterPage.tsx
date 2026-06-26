import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearAuthError());
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
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
          <h1 className={styles['hero-title']}>Create account</h1>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.card}>
          {(error || localError) && <p className={styles.error}>{error ?? localError}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••••••••••••••"
                required
                minLength={6}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••••••••••••••"
                required
                minLength={6}
              />
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? 'Please wait…' : 'Create account'}
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
                Cancel
              </button>
            </div>

            <p className={styles.switchText}>
              Already have an account?{' '}
              <Link to="/login" className={styles.switchLink}>
                Log in
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
