import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MenuItem from './MenuItem';
import { useCart } from '../context/CartContext';
import styles from './MenuPage.module.css';

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  { label: 'Dessert', apiCategory: 'Dessert' },
  { label: 'Dinner', apiCategory: 'Beef' },
  { label: 'Breakfast', apiCategory: 'Breakfast' },
];

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setVisibleCount(ITEMS_PER_PAGE);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory.apiCategory}`
        );
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error('Failed to fetch meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [activeCategory]);

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const handleCategoryClick = (category) => {
    if (category.label !== activeCategory.label) {
      setActiveCategory(category);
    }
  };

  const visibleMeals = meals.slice(0, visibleCount);
  const hasMore = visibleCount < meals.length;

  return (
    <div className="menu-page">
      <Header />
      <main>
        <div className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>Browse our menu</h1>
            <p className={styles.subtitle}>
              Use our menu to place an order online, or{' '}
              <span className={styles.highlight}>phone</span> our store
              to place a pickup order. Fast and fresh food.
            </p>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className="container">
            <div className={styles.categories}>
              {CATEGORIES.map(category => (
                <button
                  key={category.label}
                  className={`${styles['category-btn']}${activeCategory.label === category.label ? ` ${styles.active}` : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {loading ? (
              <p className={styles.loading}>Loading menu…</p>
            ) : (
              <>
                <div className={styles.grid}>
                  {visibleMeals.map(meal => (
                    <MenuItem key={meal.idMeal} meal={meal} onAddToCart={addToCart} />
                  ))}
                </div>

                {hasMore && (
                  <div className={styles['see-more-container']}>
                    <button className={styles['see-more-btn']} onClick={handleSeeMore}>
                      See more
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
