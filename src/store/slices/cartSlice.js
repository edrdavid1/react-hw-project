import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { meal, quantity = 1 } = action.payload || {};
      state.cartCount += quantity;

      if (!meal) {
        return;
      }

      const existingItem = state.items.find((item) => item.idMeal === meal.idMeal);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...meal,
          quantity,
        });
      }
    },
    clearCart(state) {
      state.cartCount = 0;
      state.items = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
