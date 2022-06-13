export interface GetParamsInterface {
  perPage?: number;
  page?: number;
}

export interface CrudRepositoryInterface<Type> {
  getItem: (id: string | number) => Promise<Type | undefined>;
  get?: (params: GetParamsInterface) => Promise<Type[]> | undefined;
  delete?: (id: string | number) => void;
  insert?: (item: Type) => void;
  update?: (item: Type) => void;
}
