import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const ITEMS_PER_PAGE = 6;

export const CATEGORIES = [
  { label: 'Dessert', apiCategory: 'Dessert' },
  { label: 'Dinner', apiCategory: 'Beef' },
  { label: 'Breakfast', apiCategory: 'Breakfast' },
];

const initialState = {
  meals: [],
  visibleCount: ITEMS_PER_PAGE,
  activeCategory: CATEGORIES[0],
  loading: false,
  error: null,
};

export const fetchMealsByCategory = createAsyncThunk(
  'menu/fetchMealsByCategory',
  async (apiCategory, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${apiCategory}`,
      );
      const data = await response.json();

      const logs = JSON.parse(localStorage.getItem('fetchLogs') || '[]');
      logs.push({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${apiCategory}`,
        payload: null,
        status: response.status,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('fetchLogs', JSON.stringify(logs));

      return data?.meals || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch menu');
    }
  },
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
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
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory, increaseVisibleCount } = menuSlice.actions;
export default menuSlice.reducer;
