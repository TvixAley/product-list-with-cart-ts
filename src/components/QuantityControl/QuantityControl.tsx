import { useEffect, useRef } from 'react';
import addToCartIcon from '@/assets/icons/icon-add-to-cart.svg';
import styles from './QuantityControl.module.css';
import IncrementIcon from '@/assets/icons/icon-increment-quantity.svg?react';
import DecrementIcon from '@/assets/icons/icon-decrement-quantity.svg?react';

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
  const addRef = useRef<HTMLButtonElement>(null);
  const incrementRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<'add' | 'increment' | null>(null);

  useEffect(() => {
    if (pendingFocus.current === 'increment') incrementRef.current?.focus();
    if (pendingFocus.current === 'add') addRef.current?.focus();
    pendingFocus.current = null;
  }, [quantity]);

  function handleAdd() {
    pendingFocus.current = 'increment';
    onAdd();
  }

  function handleDecrement() {
    if (quantity === 1) pendingFocus.current = 'add';
    onDecrement();
  }

  if (quantity === 0) {
    return (
      <button
        ref={addRef}
        type="button"
        className={`${styles.control} ${styles.add} text-preset-4-bold`}
        onClick={handleAdd}
      >
        <img className={styles.icon} src={addToCartIcon} alt="" />
        Add to Cart
      </button>
    );
  }

  return (
    <div className={`${styles.control} ${styles.stepper} text-preset-4-bold`}>
      <button
        type="button"
        className={styles.step}
        onClick={handleDecrement}
        aria-label="Decrease quantity"
      >
        <DecrementIcon aria-hidden="true" />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        ref={incrementRef}
        type="button"
        className={styles.step}
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        <IncrementIcon aria-hidden="true" />
      </button>
    </div>
  );
}
