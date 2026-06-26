import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { Category, Meal } from '../store/slices/menuSlice';

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const { meals, visibleCount, activeCategory, loading } = useAppSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMealsByCategory(activeCategory.apiCategory));
  }, [dispatch, activeCategory]);

  const handleSeeMore = () => {
    dispatch(increaseVisibleCount());
  };

  const handleCategoryClick = (category: Category) => {
    if (category.apiCategory !== activeCategory.apiCategory) {
      dispatch(setActiveCategory(category));
    }
  };

  const { t } = useTranslation();
  const visibleMeals = meals.slice(0, visibleCount);
  const hasMore = visibleCount < meals.length;

  return (
    <div className="menu-page">
      <Header />
      <main>
        <div className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>{t('menu.title')}</h1>
            <p className={styles.subtitle}>
              {t('menu.descriptionStart')}{' '}
              <span className={styles.highlight}>{t('menu.phone')}</span>{' '}
              {t('menu.descriptionEnd')}
            </p>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className="container">
            <div className={styles.categories}>
              {CATEGORIES.map((category) => (
                <button
                  key={category.apiCategory}
                  className={clsx(styles['category-btn'], { [styles.active]: activeCategory.apiCategory === category.apiCategory })}
                  onClick={() => handleCategoryClick(category)}
                >
                  {t(`menu.categories.${category.apiCategory.toLowerCase()}`)}
                </button>
              ))}
            </div>

            {loading ? (
              <p className={styles.loading}>{t('menu.loading')}</p>
            ) : (
              <>
                <div className={styles.grid}>
                  {visibleMeals.map((meal: Meal) => (
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
                      {t('menu.seeMore')}
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
