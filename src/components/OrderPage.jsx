import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import styles from './OrderPage.module.css';

const OrderPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>My Orders</h1>
        <p className={styles.subtitle}>Logged in as <strong>{user?.email}</strong></p>
        <button className={styles['logout-btn']} onClick={handleLogout}>
          Log Out
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;
