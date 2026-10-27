import { formatPrice } from '@/lib/formatPrice';
import styles from './OrderTotal.module.css';

export function OrderTotal({ value }: { value: number }) {
  return (
    <p className={styles.total}>
      <span className="text-preset-4">Order Total</span>
      <strong className="text-preset-2">{formatPrice(value)}</strong>
    </p>
  );
}
