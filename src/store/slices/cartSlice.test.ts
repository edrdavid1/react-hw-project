import reducer, { addToCart, clearCart, removeFromCart } from './cartSlice';

describe('cartSlice reducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const state = reducer(undefined, { type: 'unknown' } as any);
    expect(state).toEqual({ cartCount: 0, items: [] });
  });

  it('addToCart with undefined payload increments cartCount but does not add items', () => {
    const state = reducer(undefined, addToCart(undefined as any));
    expect(state.cartCount).toBe(1);
    expect(state.items).toHaveLength(0);
  });

  const meal = {
    idMeal: 'meal-123',
    strMeal: 'Test Meal',
    strMealThumb: 'thumb.jpg',
  } as any;

  it('addToCart with meal payload adds the item and updates cartCount', () => {
    const state = reducer(undefined, addToCart({ meal, quantity: 2 } as any));
    expect(state.cartCount).toBe(2);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].idMeal).toBe(meal.idMeal);
    expect(state.items[0].quantity).toBe(2);
  });

  it('adding the same meal again increases item quantity and cartCount', () => {
    let state = reducer(undefined, addToCart({ meal, quantity: 1 } as any));
    state = reducer(state, addToCart({ meal, quantity: 3 } as any));
    expect(state.cartCount).toBe(4);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(4);
  });

  it('removeFromCart removes item and reduces cartCount by item quantity', () => {
    const startingState = {
      cartCount: 3,
      items: [{ ...meal, quantity: 3 }],
    } as any;
    const state = reducer(startingState, removeFromCart(meal.idMeal));
    expect(state.cartCount).toBe(0);
    expect(state.items).toHaveLength(0);
  });

  it('clearCart resets cartCount and items', () => {
    let state = reducer(undefined, addToCart({ meal, quantity: 2 } as any));
    state = reducer(state, clearCart());
    expect(state.cartCount).toBe(0);
    expect(state.items).toHaveLength(0);
  });
});
