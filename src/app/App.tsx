import { products } from '../data/products.ts';
import { Cart } from '@/components/Cart/Cart.tsx';
import styles from './App.module.css';
import { ProductList } from '@/components/ProductList/ProductList.tsx';

export default function App() {
  return (
    <main className={styles.layout}>
      <section>
        <h1 className="text-preset-1">Desserts</h1>
        <ProductList products={products} />
      </section>
      <Cart />
    </main>
  );
}
