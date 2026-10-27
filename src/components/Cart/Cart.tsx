import { useCartDispatch } from '@/context/useCart';
import { useCartSummary } from '@/context/useCartSummary';
import emptyCartImage from '@/assets/icons/illustration-empty-cart.svg';
import carbonNeutralIcon from '@/assets/icons/icon-carbon-neutral.svg';
import styles from './Cart.module.css';
import { useState } from 'react';
import { OrderConfirmedModal } from '@/components/OrderConfirmedModal/OrderConfirmedModal.tsx';
import { Button } from '@/components/Button/Button.tsx';
import { OrderTotal } from '@/components/OrderTotal/OrderTotal.tsx';
import { OrderLine } from '@/components/OrderLine/OrderLine.tsx';

export function Cart() {
  const { lines, totalCount, totalPrice } = useCartSummary();
  const dispatch = useCartDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <aside className={styles.cart}>
      <h2 className={`${styles.title} text-preset-2`}>
        Your Cart ({totalCount})
      </h2>

      {lines.length === 0 ? (
        <div className={styles.empty}>
          <img src={emptyCartImage} alt="" width="128" height="128" />
          <p className="text-preset-4-bold">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <ul>
            {lines.map(({ product, quantity, total }) => (
              <OrderLine
                key={product.id}
                variant="cart"
                product={product}
                quantity={quantity}
                total={total}
                onRemove={() =>
                  dispatch({ type: 'REMOVE_ITEM', productId: product.id })
                }
              />
            ))}
          </ul>
          <OrderTotal value={totalPrice} />
          <p className={`${styles.delivery} text-preset-4`}>
            <img src={carbonNeutralIcon} alt="" />
            <span>
              This is a <strong>carbon-neutral</strong> delivery
            </span>
          </p>
          <Button onClick={() => setIsConfirmOpen(true)}>Confirm Order</Button>
        </>
      )}
      <OrderConfirmedModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
      />
    </aside>
  );
}
