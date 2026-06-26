import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { logoutUser } from '../store/slices/authSlice';
import styles from './OrderPage.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { cartCount, items } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>{t('orders.title')}</h1>
        <p className={styles.subtitle}>{t('orders.loggedInAs')} <strong>{user?.email}</strong></p>
        <p className={styles.subtitle}>{t('orders.itemsInCart')} <strong>{cartCount}</strong></p>

        <section className={styles['orders-list']}>
          {items.length === 0 ? (
            <p className={styles['empty-orders']}>{t('orders.emptyCart')}</p>
          ) : (
            items.map((item) => (
              <article key={item.idMeal} className={styles['order-item']}>
                <img src={item.strMealThumb} alt={item.strMeal} className={styles.thumbnail} />
                <div>
                  <h3 className={styles['item-title']}>{item.strMeal}</h3>
                  <p className={styles['item-qty']}>{t('orders.quantity', { count: item.quantity })}</p>
                </div>
              </article>
            ))
          )}
        </section>

        <button className={styles['logout-btn']} onClick={handleLogout}>
          {t('orders.logout')}
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;
