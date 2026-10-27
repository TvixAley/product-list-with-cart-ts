import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import RemoveIcon from '@/assets/icons/icon-remove-item.svg?react';
import styles from './OrderLine.module.css';

type OrderLineProps = {
  product: Product;
  quantity: number;
  total: number;
} & ({ variant: 'cart'; onRemove: () => void } | { variant: 'summary' });

export function OrderLine(props: OrderLineProps) {
  const { product, quantity, total } = props;

  return (
    <li className={styles.row}>
      {props.variant === 'summary' && (
        <img className={styles.thumb} src={product.image.thumbnail} alt="" />
      )}

      <div className={styles.details}>
        <h3 className="text-preset-4-bold">{product.name}</h3>
        <p className={`${styles.meta} text-preset-4`}>
          <span className={styles.quantity}>{quantity}x</span>
          <span className={styles.unit}>@ {formatPrice(product.price)}</span>
          {props.variant === 'cart' && (
            <span className={styles.total}>{formatPrice(total)}</span>
          )}
        </p>
      </div>

      {props.variant === 'cart' ? (
        <button
          type="button"
          className={styles.remove}
          onClick={props.onRemove}
          aria-label={`Remove ${product.name}`}
        >
          <RemoveIcon aria-hidden="true" />
        </button>
      ) : (
        <span className="text-preset-3">{formatPrice(total)}</span>
      )}
    </li>
  );
}
