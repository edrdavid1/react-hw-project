import { useState } from 'react';
import styles from './MenuItem.module.css';

const getPrice = (idMeal) => {
  const hash = parseInt(idMeal.slice(-3));
  return ((hash % 1200) / 100 + 5).toFixed(2);
};

const MenuItem = ({ meal, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const price = getPrice(meal.idMeal);

  const handleAdd = () => {
    onAddToCart(quantity);
  };

  return (
    <div className={styles.card}>
      <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{meal.strMeal}</h3>
          <span className={styles.price}>$ {price} USD</span>
        </div>
        <p className={styles.description}>
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <div className={styles.actions}>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className={styles.quantity}
          />
          <button className={styles['add-btn']} onClick={handleAdd}>
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
