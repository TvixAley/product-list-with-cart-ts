import { productsById } from '@/data/products';
import { useCart } from './useCart';

export function useCartSummary() {
  const cart = useCart();

  const lines = cart.flatMap((item) => {
    const product = productsById.get(item.productId);
    return product
      ? [
          {
            product,
            quantity: item.quantity,
            total: product.price * item.quantity,
          },
        ]
      : [];
  });

  const totalCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const totalPrice = lines.reduce((sum, l) => sum + l.total, 0);

  return { lines, totalCount, totalPrice };
}
