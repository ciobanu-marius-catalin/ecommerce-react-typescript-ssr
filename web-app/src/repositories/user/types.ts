import { CrudRepositoryInterface } from '../common';

export interface UserInterface {
  id: number;
  email: string;
}

export type UserRepositoryInterface = CrudRepositoryInterface<UserInterface>;
