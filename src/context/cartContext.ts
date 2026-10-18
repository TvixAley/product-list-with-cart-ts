import { createContext, type Dispatch } from 'react';
import type { CartItem } from '@/types/cart';
import type { CartAction } from './cartReducer';

export const CartContext = createContext<CartItem[] | null>(null);
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(
  null
);
