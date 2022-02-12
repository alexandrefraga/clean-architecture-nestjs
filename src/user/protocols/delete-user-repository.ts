export interface DeleteUserRepository {
  deleteById(id: string): Promise<void>;
}
