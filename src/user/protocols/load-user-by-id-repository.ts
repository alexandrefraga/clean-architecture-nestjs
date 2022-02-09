export interface LoadUserByIdRepository {
  loadById(id: string): Promise<LoadUserByIdRepository.OutPut>;
}

export namespace LoadUserByIdRepository {
  export type OutPut = {
    id: string;
    name: string;
    phone: string;
    email: string;
    status: boolean;
  };
}
