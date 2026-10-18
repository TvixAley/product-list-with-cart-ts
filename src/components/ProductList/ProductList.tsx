import type { Product } from '@/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export function ProductList({ products }: { products: Product[] }) {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
