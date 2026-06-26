import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { logoutUser } from '../store/slices/authSlice';
import { removeFromCart } from '../store/slices/cartSlice';
import styles from './CartPage.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const getPrice = (idMeal: string): string => {
  const hash = Number.parseInt(idMeal.slice(-3), 10);
  return ((hash % 1200) / 100 + 5).toFixed(2);
};

const CartPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { cartCount, items } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const handleDeleteItem = (idMeal: string) => {
    dispatch(removeFromCart(idMeal));
  };

  const handleCheckout = () => {
    alert(t('cart.checkoutAlert'));
  };

  // Calculate prices
  const itemsWithPrices = items.map((item) => {
    const unitPrice = parseFloat(getPrice(item.idMeal));
    const totalPrice = unitPrice * item.quantity;
    return {
      ...item,
      unitPrice,
      totalPrice,
    };
  });

  const grandTotal = itemsWithPrices.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>{t('cart.title')}</h1>
              <p className={styles.subtitle}>
                {t('cart.loggedInAs')} <strong>{user?.email}</strong>
              </p>
            </div>
            <button className={styles['logout-btn']} onClick={handleLogout}>
              {t('cart.logout')}
            </button>
          </div>

          <div className={styles.content}>
            <section className={styles['cart-list']}>
              {items.length === 0 ? (
                <div className={styles['empty-container']}>
                  <p className={styles['empty-cart']}>{t('cart.emptyCart')}</p>
                </div>
              ) : (
                itemsWithPrices.map((item) => (
                  <article key={item.idMeal} className={styles['cart-item']}>
                    <img src={item.strMealThumb} alt={item.strMeal} className={styles.thumbnail} />
                    <div className={styles['item-info']}>
                      <h3 className={styles['item-title']}>{item.strMeal}</h3>
                      <div className={styles['item-details']}>
                        <span className={styles['item-qty']}>
                          {t('cart.quantity', { count: item.quantity })}
                        </span>
                        <span className={styles['item-unit-price']}>
                          {t('cart.price', { price: item.unitPrice.toFixed(2) })}
                        </span>
                      </div>
                    </div>
                    <div className={styles['item-actions']}>
                      <span className={styles['item-total-price']}>
                        $ {item.totalPrice.toFixed(2)} USD
                      </span>
                      <button
                        className={styles['delete-btn']}
                        onClick={() => handleDeleteItem(item.idMeal)}
                        aria-label={t('cart.delete')}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        <span className={styles['delete-btn-text']}>{t('cart.delete')}</span>
                      </button>
                    </div>
                  </article>
                ))
              )}
            </section>

            {items.length > 0 && (
              <aside className={styles.summary}>
                <h2 className={styles['summary-title']}>{t('cart.title')}</h2>
                <div className={styles['summary-row']}>
                  <span>{t('cart.itemsInCart')}</span>
                  <strong>{cartCount}</strong>
                </div>
                <div className={styles['summary-divider']} />
                <div className={styles['summary-row']}>
                  <strong>{t('cart.total', { total: grandTotal.toFixed(2) })}</strong>
                </div>
                <button className={styles['checkout-btn']} onClick={handleCheckout}>
                  {t('cart.checkout')}
                </button>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
