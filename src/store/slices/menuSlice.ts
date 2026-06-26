import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

const ITEMS_PER_PAGE = 6;

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
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
  meals: Meal[] | null;
}

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

export const fetchMealsByCategory = createAsyncThunk<
  Meal[],
  string,
  { rejectValue: string }
>('menu/fetchMealsByCategory', async (apiCategory, { rejectWithValue }) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${apiCategory}`;
    const response = await fetch(url);
    const data = (await response.json()) as MealDbResponse;

    const logs = JSON.parse(localStorage.getItem('fetchLogs') ?? '[]') as Array<{
      url: string;
      payload: string | null;
      status: number;
      timestamp: string;
    }>;

    logs.push({
      url,
      payload: null,
      status: response.status,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem('fetchLogs', JSON.stringify(logs));

    return data.meals ?? [];
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
