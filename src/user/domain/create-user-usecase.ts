export interface CreateUserUsecase {
  create(user: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<{ id: string } | Error>;
}
