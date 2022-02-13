export interface DeleteUserUsecase {
  deleteById(id: string): Promise<null | Error>;
}
