import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';

export type CartAction =
  | { type: 'ADD_ITEM'; productId: Product['id'] }
  | { type: 'REMOVE_ITEM'; productId: Product['id'] }
  | { type: 'INCREMENT'; productId: Product['id'] }
  | { type: 'DECREMENT'; productId: Product['id'] }
  | { type: 'CLEAR_CART' };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.some((item) => item.productId === action.productId))
        return state;
      return [...state, { productId: action.productId, quantity: 1 }];

    case 'INCREMENT':
      return state.map((item) =>
        item.productId === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case 'DECREMENT': {
      const item = state.find((i) => i.productId === action.productId);
      if (item?.quantity === 1) {
        return state.filter((i) => i.productId !== action.productId);
      }
      return state.map((i) =>
        i.productId === action.productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    }

    case 'REMOVE_ITEM':
      return state.filter((item) => item.productId !== action.productId);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}
