import { LoadUserByIdRepository } from '../protocols/load-user-by-id-repository';
import { mock, MockProxy } from 'jest-mock-extended';
import { DeleteUserService } from '../services/delete-user.service';
import { DeleteUserRepository } from '../protocols/delete-user-repository';

describe('DeleteUser Service', () => {
  let deleteUserService: DeleteUserService;
  let loadUserRepository: MockProxy<LoadUserByIdRepository>;
  let deleteUserRepository: MockProxy<DeleteUserRepository>;

  beforeEach(() => {
    loadUserRepository = mock();
    loadUserRepository.loadById.mockResolvedValue({
      id: 'user_id',
      name: 'user_name',
      phone: 'user_phone',
      email: 'user@mail.com',
      status: true,
    });
    deleteUserRepository = mock();
    deleteUserRepository.deleteById.mockResolvedValue();
    deleteUserService = new DeleteUserService(
      loadUserRepository,
      deleteUserRepository,
    );
  });

  it('Should call loadUserById with correct id', async () => {
    const loadByIdSpy = jest.spyOn(loadUserRepository, 'loadById');

    await deleteUserService.deleteById('any_id');

    expect(loadByIdSpy).toHaveBeenCalledTimes(1);
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('should return an Error if not exists an user with id provided', async () => {
    jest.spyOn(loadUserRepository, 'loadById').mockResolvedValueOnce(undefined);

    const response = await deleteUserService.deleteById('any_id');

    expect(response).toEqual(new Error('user not found'));
  });

  it('should throw if LoadUserById throws', async () => {
    jest
      .spyOn(loadUserRepository, 'loadById')
      .mockRejectedValueOnce(new Error());

    const promise = deleteUserService.deleteById('any_id');

    await expect(promise).rejects.toThrowError();
  });

  it('Should call DeleteUserRepository with correct id', async () => {
    const deleteSpy = jest.spyOn(deleteUserRepository, 'deleteById');

    await deleteUserService.deleteById('any_id');

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith('any_id');
  });

  it('should throw if DeleteUserRepository throws', async () => {
    jest
      .spyOn(deleteUserRepository, 'deleteById')
      .mockRejectedValueOnce(new Error());

    const promise = deleteUserService.deleteById('any_id');

    await expect(promise).rejects.toThrowError();
  });

  it('should return null on success', async () => {
    const response = await deleteUserService.deleteById('any_id');

    expect(response).toBeNull();
  });
});
