import { useEffect, useRef } from 'react';
import { useCartDispatch } from '@/context/useCart';
import { useCartSummary } from '@/context/useCartSummary';
import orderConfirmedIcon from '@/assets/icons/icon-order-confirmed.svg';
import styles from './OrderConfirmedModal.module.css';
import { Button } from '@/components/Button/Button.tsx';
import { OrderLine } from '@/components/OrderLine/OrderLine.tsx';
import { OrderTotal } from '@/components/OrderTotal/OrderTotal.tsx';

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
              <OrderLine
                key={product.id}
                variant="summary"
                product={product}
                quantity={quantity}
                total={total}
              />
            ))}
          </ul>
          <OrderTotal value={totalPrice} />
        </div>

        <Button onClick={handleStartNewOrder}>Start New Order</Button>
      </div>
    </dialog>
  );
}
