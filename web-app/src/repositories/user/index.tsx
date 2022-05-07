import { useCrud, CrudRepositoryInterface } from "../common";

export interface UserInterface {
  id: number;
  email: string;
}

export type UserRepositoryInterface = CrudRepositoryInterface<UserInterface>;

function useUserRepository(): UserRepositoryInterface {
  const routes: UserRepositoryInterface =
    useCrud<UserInterface>("/admin/users");
  return routes;
}

export { useUserRepository };
