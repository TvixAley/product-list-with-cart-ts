import type { Product } from '@/types/product';
import { QuantityControl } from '../QuantityControl/QuantityControl';
import { useCart, useCartDispatch } from '@/context/useCart';
import { formatPrice } from '@/lib/formatPrice';
import styles from './ProductCard.module.css';

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const quantity =
    cart.find((item) => item.productId === product.id)?.quantity ?? 0;

  const { image } = product;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={image.desktop} />
          <source media="(min-width: 640px)" srcSet={image.tablet} />
          <img
            className={
              quantity > 0
                ? `${styles.image} ${styles.imageActive}`
                : styles.image
            }
            src={image.mobile}
            alt=""
          />
        </picture>
        <div className={styles.control}>
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
        </div>
      </div>

      <div className={styles.info}>
        <p className={`${styles.category} text-preset-4`}>{product.category}</p>
        <h2 className="text-preset-3">{product.name}</h2>
        <p className={`${styles.price} text-preset-3`}>
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
