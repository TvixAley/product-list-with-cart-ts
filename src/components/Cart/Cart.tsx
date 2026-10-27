import { useCartDispatch } from '@/context/useCart';
import { useCartSummary } from '@/context/useCartSummary';
import { formatPrice } from '@/lib/formatPrice';
import { CartItemRow } from '../CartItemRow/CartItemRow';
import emptyCartImage from '@/assets/icons/illustration-empty-cart.svg';
import carbonNeutralIcon from '@/assets/icons/icon-carbon-neutral.svg';
import styles from './Cart.module.css';
import { useState } from 'react';
import { OrderConfirmedModal } from '@/components/OrderConfirmedModal/OrderConfirmedModal.tsx';

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
              <CartItemRow
                key={product.id}
                product={product}
                quantity={quantity}
                total={total}
                onRemove={() =>
                  dispatch({ type: 'REMOVE_ITEM', productId: product.id })
                }
              />
            ))}
          </ul>
          <p className={styles.totalRow}>
            <span className="text-preset-4">Order Total</span>
            <strong className="text-preset-2">{formatPrice(totalPrice)}</strong>
          </p>
          <p className={`${styles.delivery} text-preset-4`}>
            <img src={carbonNeutralIcon} alt="" />
            <span>
              This is a <strong>carbon-neutral</strong> delivery
            </span>
          </p>
          <button
            className={`${styles.confirm} text-preset-3`}
            onClick={() => setIsConfirmOpen(true)}
          >
            Confirm Order
          </button>
        </>
      )}
      <OrderConfirmedModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
      />
    </aside>
  );
}
