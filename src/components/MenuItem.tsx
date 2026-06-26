import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MenuItem.module.css';
import type { Meal } from '../store/slices/menuSlice';

interface MenuItemProps {
  meal: Meal;
  onAddToCart: (quantity: number, selectedMeal: Meal) => void;
}

const getPrice = (idMeal: string): string => {
  const hash = Number.parseInt(idMeal.slice(-3), 10);
  return ((hash % 1200) / 100 + 5).toFixed(2);
};

const MenuItem = ({ meal, onAddToCart }: MenuItemProps) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const price = getPrice(meal.idMeal);

  const handleAdd = () => {
    onAddToCart(quantity, meal);
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
          {t('menuItem.description')}
        </p>
        <div className={styles.actions}>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value, 10) || 1))}
            className={styles.quantity}
            aria-label={t('menuItem.quantityLabel')}
          />
          <button className={styles['add-btn']} onClick={handleAdd}>
            {t('menuItem.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
