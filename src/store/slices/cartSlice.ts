import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Meal } from './menuSlice';

export interface CartItem extends Meal {
  quantity: number;
}

interface CartState {
  cartCount: number;
  items: CartItem[];
}

interface AddToCartPayload {
  meal?: Meal;
  quantity?: number;
}

const initialState: CartState = {
  cartCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload | undefined>) {
      const { meal, quantity = 1 } = action.payload ?? {};
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
    removeFromCart(state, action: PayloadAction<string>) {
      const idMeal = action.payload;
      const existingItem = state.items.find((item) => item.idMeal === idMeal);
      if (existingItem) {
        state.cartCount -= existingItem.quantity;
        state.items = state.items.filter((item) => item.idMeal !== idMeal);
      }
    },
  },
});

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
