import { useCrud } from '../common';
import { UserRepositoryInterface, UserInterface } from './types';

function useUserRepository(): UserRepositoryInterface {
  const routes: UserRepositoryInterface =
    useCrud<UserInterface>('/admin/users');
  return routes;
}
export * from './types';
export { useUserRepository };
