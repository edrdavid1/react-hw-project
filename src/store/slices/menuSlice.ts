import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

const ITEMS_PER_PAGE = 6;
const MEALS_API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  price?: number;
}

export interface Category {
  label: string;
  apiCategory: string;
}

interface MenuState {
  meals: Meal[];
  visibleCount: number;
  activeCategory: Category;
  loading: boolean;
  error: string | null;
}

interface MealDbResponse {
  meals: unknown[] | null;
}

type RawMeal = Record<string, unknown>;

export const CATEGORIES: Category[] = [
  { label: 'Dessert', apiCategory: 'Dessert' },
  { label: 'Dinner', apiCategory: 'Beef' },
  { label: 'Breakfast', apiCategory: 'Breakfast' },
];

const initialState: MenuState = {
  meals: [],
  visibleCount: ITEMS_PER_PAGE,
  activeCategory: CATEGORIES[0],
  loading: false,
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

const getStringField = (value: unknown): string | null => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return null;
};

const getNumberField = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
};

const getRawMeals = (data: unknown): RawMeal[] => {
  if (Array.isArray(data)) {
    return data.filter((item): item is RawMeal => typeof item === 'object' && item !== null);
  }

  if (typeof data === 'object' && data !== null && 'meals' in data) {
    const maybeResponse = data as MealDbResponse;
    if (Array.isArray(maybeResponse.meals)) {
      return maybeResponse.meals.filter((item): item is RawMeal => typeof item === 'object' && item !== null);
    }
  }

  return [];
};

const normalizeMeal = (meal: RawMeal, index: number): Meal => {
  const idMeal = getStringField(meal.idMeal) ?? getStringField(meal.id) ?? `meal-${index}`;

  const strMeal =
    getStringField(meal.strMeal) ??
    getStringField(meal.meal) ??
    getStringField(meal.name) ??
    getStringField(meal.title) ??
    `Meal ${index + 1}`;

  const strMealThumb =
    getStringField(meal.strMealThumb) ??
    getStringField(meal.img) ??
    getStringField(meal.image) ??
    getStringField(meal.imageUrl) ??
    getStringField(meal.thumb) ??
    '/images/light/IMAGE.png';

  const price = getNumberField(meal.price) ?? undefined;

  return {
    idMeal,
    strMeal,
    strMealThumb,
    price,
  };
};

const filterRawMealsByCategory = (meals: RawMeal[], apiCategory: string): RawMeal[] => {
  const targetCategory = apiCategory.trim().toLowerCase();

  if (!targetCategory) {
    return meals;
  }

  const categoryAliases: Record<string, string[]> = {
    dessert: ['dessert'],
    breakfast: ['breakfast'],
    beef: ['beef', 'dinner'],
  };

  const allowedCategories = categoryAliases[targetCategory] ?? [targetCategory];
  const mealsWithCategory = meals.filter((meal) => getStringField(meal.category) !== null);

  if (mealsWithCategory.length === 0) {
    return meals;
  }

  const filtered = meals.filter((meal) => {
    const category = getStringField(meal.category);
    return category ? allowedCategories.includes(category.trim().toLowerCase()) : false;
  });

  return filtered;
};

export const fetchMealsByCategory = createAsyncThunk<
  Meal[],
  string,
  { rejectValue: string }
>('menu/fetchMealsByCategory', async (apiCategory, { rejectWithValue }) => {
  try {
    const url = MEALS_API_URL;
    const response = await fetch(url);
    const data = (await response.json()) as unknown;

    const logs = JSON.parse(localStorage.getItem('fetchLogs') ?? '[]') as Array<{
      url: string;
      payload: string | null;
      status: number;
      timestamp: string;
    }>;

    logs.push({
      url: `${url}?category=${apiCategory}`,
      payload: null,
      status: response.status,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem('fetchLogs', JSON.stringify(logs));

    const rawMeals = getRawMeals(data);
    const categoryFilteredMeals = filterRawMealsByCategory(rawMeals, apiCategory);

    return categoryFilteredMeals.map(normalizeMeal);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Failed to fetch menu'));
  }
});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<Category>) {
      state.activeCategory = action.payload;
      state.visibleCount = ITEMS_PER_PAGE;
    },
    increaseVisibleCount(state) {
      state.visibleCount += ITEMS_PER_PAGE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMealsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch menu';
      });
  },
});

export const { setActiveCategory, increaseVisibleCount } = menuSlice.actions;

export default menuSlice.reducer;
