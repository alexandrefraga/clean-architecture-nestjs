export interface CreateUser {
  createUser(user: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<CreateUser.Output>;
}

export namespace CreateUser {
  export type Output = { id: string };
}
