import { useContext } from 'react';
import { CartContext, CartDispatchContext } from './cartContext';

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used inside CartProvider');
  return cart;
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch)
    throw new Error('useCartDispatch must be used inside CartProvider');
  return dispatch;
}
