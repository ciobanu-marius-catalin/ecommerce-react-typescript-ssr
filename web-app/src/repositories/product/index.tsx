import { useCrud, CrudRepositoryInterface } from '../common';

export interface ProductInterface {
  id: number;
  description: string;
  price: number;
  thumbnail: string;
  title: string;
  updated_at: Date;
  created_at: Date;
}

export type UserRepositoryInterface = CrudRepositoryInterface<ProductInterface>;

function useProductRepository(): UserRepositoryInterface {
  const routes: UserRepositoryInterface =
    useCrud<ProductInterface>('/products');
  return routes;
}

export { useProductRepository };
