export interface LoadUserById {
  loadById(id: string): Promise<LoadUserById.OutPut>;
}

export namespace LoadUserById {
  export type OutPut = {
    id: string;
    name: string;
    phone: string;
    email: string;
    status: boolean;
  };
}
