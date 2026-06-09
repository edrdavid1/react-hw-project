import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { logoutUser } from '../store/slices/authSlice';
import styles from './OrderPage.module.css';

const OrderPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { cartCount, items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>My Orders</h1>
        <p className={styles.subtitle}>Logged in as <strong>{user?.email}</strong></p>
        <p className={styles.subtitle}>Items in cart: <strong>{cartCount}</strong></p>

        <section className={styles['orders-list']}>
          {items.length === 0 ? (
            <p className={styles['empty-orders']}>Your cart is empty. Add dishes from menu to create an order.</p>
          ) : (
            items.map((item) => (
              <article key={item.idMeal} className={styles['order-item']}>
                <img src={item.strMealThumb} alt={item.strMeal} className={styles.thumbnail} />
                <div>
                  <h3 className={styles['item-title']}>{item.strMeal}</h3>
                  <p className={styles['item-qty']}>Quantity: {item.quantity}</p>
                </div>
              </article>
            ))
          )}
        </section>

        <button className={styles['logout-btn']} onClick={handleLogout}>
          Log Out
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;
