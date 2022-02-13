export interface UpdateUserUsecase {
  update(
    id: string,
    data: { name: string; phone: string },
  ): Promise<null | Error>;
}
