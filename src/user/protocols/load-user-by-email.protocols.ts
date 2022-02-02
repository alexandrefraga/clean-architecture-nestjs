export interface LoadUserByEmail {
  loadByEmail(email: string): Promise<LoadUserByEmail.OutPut>;
}

export namespace LoadUserByEmail {
  export type OutPut = {
    id: string;
    name: string;
  };
}
