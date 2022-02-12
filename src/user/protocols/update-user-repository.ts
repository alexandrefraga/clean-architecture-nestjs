export interface UpdateUserRepository {
  updateUser(id: string, data: { name: string; phone: string }): Promise<void>;
}
