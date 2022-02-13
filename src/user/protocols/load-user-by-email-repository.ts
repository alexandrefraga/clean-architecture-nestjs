export interface LoadUserByEmailRepository {
  loadByEmail(email: string): Promise<LoadUserByEmailRepository.OutPut>;
}

export namespace LoadUserByEmailRepository {
  export type OutPut = {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    status: boolean;
  };
}
