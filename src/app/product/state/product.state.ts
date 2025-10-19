import { ProductEntity } from '../model/product.entity';

export type ProductState = {
  products: ProductEntity[];
  loading: boolean;
  error: string;
};

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: '',
};
