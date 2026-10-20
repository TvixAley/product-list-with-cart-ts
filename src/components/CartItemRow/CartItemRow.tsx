import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import styles from './CartItemRow.module.css';
import RemoveIcon from '@/assets/icons/icon-remove-item.svg?react';

interface CartItemRowProps {
  product: Product;
  quantity: number;
  total: number;
  onRemove: () => void;
}

export function CartItemRow({
  product,
  quantity,
  total,
  onRemove,
}: CartItemRowProps) {
  return (
    <li className={styles.row}>
      <div className={styles.details}>
        <h3 className="text-preset-4-bold">{product.name}</h3>
        <p className={`${styles.meta} text-preset-4`}>
          <span className={styles.quantity}>{quantity}x</span>
          <span className={styles.unit}>@ {formatPrice(product.price)}</span>
          <span className={styles.total}>{formatPrice(total)}</span>
        </p>
      </div>
      <button
        className={styles.remove}
        onClick={onRemove}
        aria-label={`Remove ${product.name}`}
      >
        <RemoveIcon aria-hidden="true" />
      </button>
    </li>
  );
}
