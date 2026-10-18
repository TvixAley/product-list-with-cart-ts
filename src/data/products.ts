import type { Product } from '@/types/product';
import desserts from './desserts.json';

export const products: Product[] = desserts;
export const productsById = new Map(products.map((p) => [p.id, p]));
