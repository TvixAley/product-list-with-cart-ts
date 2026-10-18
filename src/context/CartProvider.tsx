import { useReducer, type ReactNode } from 'react';
import { cartReducer } from './cartReducer';
import { CartContext, CartDispatchContext } from './cartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
