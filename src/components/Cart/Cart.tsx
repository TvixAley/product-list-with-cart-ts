// src/components/Cart/Cart.tsx
import { useCartDispatch } from '@/context/useCart';
import { useCartSummary } from '@/context/useCartSummary';
import { formatPrice } from '@/lib/formatPrice';
import { CartItemRow } from '../CartItemRow/CartItemRow';

export function Cart() {
  const { lines, totalCount, totalPrice } = useCartSummary();
  const dispatch = useCartDispatch();

  return (
    <aside>
      <h2 className="text-preset-2">Your Cart ({totalCount})</h2>

      {lines.length === 0 ? (
        <p>Your added items will appear here</p>
      ) : (
        <>
          <ul>
            {lines.map(({ product, quantity, total }) => (
              <CartItemRow
                key={product.id}
                product={product}
                quantity={quantity}
                total={total}
                onRemove={() =>
                  dispatch({ type: 'REMOVE_ITEM', productId: product.id })
                }
              />
            ))}
          </ul>
          <p>
            <span>Order Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </p>
          <button>Confirm Order</button>
        </>
      )}
    </aside>
  );
}
