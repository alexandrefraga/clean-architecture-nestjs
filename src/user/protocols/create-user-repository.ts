export interface CreateUserRepository {
  createUser(user: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<CreateUserRepository.Output>;
}

export namespace CreateUserRepository {
  export type Output = { id: string };
}
