import { useCrud, CrudRepositoryInterface } from '../common';
import { ProductInterface, UserRepositoryInterface } from './types';

function useProductRepository(): UserRepositoryInterface {
  const routes: UserRepositoryInterface =
    useCrud<ProductInterface>('/products');
  return routes;
}

export * from './types';
export { useProductRepository };
