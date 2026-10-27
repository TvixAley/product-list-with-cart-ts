import { useEffect, useRef } from 'react';
import { useCartDispatch } from '@/context/useCart';
import { useCartSummary } from '@/context/useCartSummary';
import { formatPrice } from '@/lib/formatPrice';
import orderConfirmedIcon from '@/assets/icons/icon-order-confirmed.svg';
import styles from './OrderConfirmedModal.module.css';

interface OrderConfirmedModalProps {
  open: boolean;
  onClose: () => void;
}

export function OrderConfirmedModal({
  open,
  onClose,
}: OrderConfirmedModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { lines, totalPrice } = useCartSummary();
  const dispatch = useCartDispatch();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleStartNewOrder() {
    dispatch({ type: 'CLEAR_CART' });
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="order-confirmed-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // клик по подложке
      }}
    >
      <div className={styles.content}>
        <img src={orderConfirmedIcon} alt="" width="48" height="48" />

        <div className={styles.heading}>
          <h2 id="order-confirmed-title" className="text-preset-1">
            Order Confirmed
          </h2>
          <p className={`${styles.subtitle} text-preset-3-regular`}>
            We hope you enjoy your food!
          </p>
        </div>

        <div className={styles.summary}>
          <ul>
            {lines.map(({ product, quantity, total }) => (
              <li key={product.id} className={styles.row}>
                <img
                  className={styles.thumb}
                  src={product.image.thumbnail}
                  alt=""
                />
                <div className={styles.details}>
                  <h3 className="text-preset-4-bold">{product.name}</h3>
                  <p className={`${styles.numbers} "text-preset-4"`}>
                    <span className={styles.quantity}>{quantity}x</span>
                    <span className={styles.unit}>
                      @ {formatPrice(product.price)}
                    </span>
                  </p>
                </div>
                <span className="text-preset-3">{formatPrice(total)}</span>
              </li>
            ))}
          </ul>

          <p className={styles.totalRow}>
            <span className="text-preset-4">Order Total</span>
            <strong className="text-preset-2">{formatPrice(totalPrice)}</strong>
          </p>
        </div>

        <button
          className={`${styles.confirm} text-preset-3`}
          onClick={handleStartNewOrder}
        >
          Start New Order
        </button>
      </div>
    </dialog>
  );
}
