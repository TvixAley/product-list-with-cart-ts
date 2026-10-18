import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';

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
    <li>
      <div>
        <h3 className="text-preset-4-bold">{product.name}</h3>
        <p>
          <span>{quantity}x</span>
          <span>@ {formatPrice(product.price)}</span>
          <span>{formatPrice(total)}</span>
        </p>
      </div>
      <button onClick={onRemove} aria-label={`Remove ${product.name}`}>
        ×
      </button>
    </li>
  );
}
