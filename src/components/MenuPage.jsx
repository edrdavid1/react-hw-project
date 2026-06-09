import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import MenuItem from './MenuItem';
import { addToCart } from '../store/slices/cartSlice';
import {
  CATEGORIES,
  fetchMealsByCategory,
  increaseVisibleCount,
  setActiveCategory,
} from '../store/slices/menuSlice';
import styles from './MenuPage.module.css';

const MenuPage = () => {
  const dispatch = useDispatch();
  const { meals, visibleCount, activeCategory, loading } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMealsByCategory(activeCategory.apiCategory));
  }, [dispatch, activeCategory]);

  const handleSeeMore = () => {
    dispatch(increaseVisibleCount());
  };

  const handleCategoryClick = (category) => {
    if (category.label !== activeCategory.label) {
      dispatch(setActiveCategory(category));
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
                    <MenuItem
                      key={meal.idMeal}
                      meal={meal}
                      onAddToCart={(quantity, selectedMeal) => {
                        dispatch(addToCart({ meal: selectedMeal, quantity }));
                      }}
                    />
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
