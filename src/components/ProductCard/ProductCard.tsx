import type { Product } from '@/types/product';
import { QuantityControl } from '../QuantityControl/QuantityControl';
import { useCart, useCartDispatch } from '@/context/useCart';

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const quantity =
    cart.find((item) => item.productId === product.id)?.quantity ?? 0;

  return (
    <article>
      <img src={product.image.thumbnail} alt={product.name} />
      <QuantityControl
        quantity={quantity}
        onAdd={() => dispatch({ type: 'ADD_ITEM', productId: product.id })}
        onIncrement={() =>
          dispatch({ type: 'INCREMENT', productId: product.id })
        }
        onDecrement={() =>
          dispatch({ type: 'DECREMENT', productId: product.id })
        }
      />
      {/* категория, название, цена */}
    </article>
  );
}
