import addToCartIcon from '@/assets/icons/icon-add-to-cart.svg';
import styles from './QuantityControl.module.css';

interface QuantityControlProps {
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityControl({
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  if (quantity === 0) {
    return (
      <button
        className={`${styles.control} ${styles.add} text-preset-4-bold`}
        onClick={onAdd}
      >
        <img className={styles.icon} src={addToCartIcon} alt="" />
        Add to Cart
      </button>
    );
  }

  return (
    <div className={`${styles.control} ${styles.stepper} text-preset-4-bold`}>
      <button
        className={styles.step}
        onClick={onDecrement}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span>{quantity}</span>
      <button
        className={styles.step}
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
