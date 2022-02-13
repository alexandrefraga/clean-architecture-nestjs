import { LoadUserByIdRepository } from '../protocols/load-user-by-id-repository';
import { UpdateUserService } from '../services/update-user.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { UpdateUserRepository } from '../protocols/update-user-repository';

describe('UpdateUser Service', () => {
  let updateUserService: UpdateUserService;
  let loadUserRepository: MockProxy<LoadUserByIdRepository>;
  let updateUserRepository: MockProxy<UpdateUserRepository>;

  beforeEach(() => {
    loadUserRepository = mock();
    loadUserRepository.loadById.mockResolvedValue({
      id: 'user_id',
      name: 'user_name',
      phone: 'user_phone',
      email: 'user@mail.com',
      status: true,
    });
    updateUserRepository = mock();
    updateUserRepository.updateUser.mockResolvedValue();
    updateUserService = new UpdateUserService(
      loadUserRepository,
      updateUserRepository,
    );
  });

  it('Should call loadUserById with correct id', async () => {
    const loadByIdSpy = jest.spyOn(loadUserRepository, 'loadById');

    await updateUserService.update('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });

    expect(loadByIdSpy).toHaveBeenCalledTimes(1);
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('should return an Error if not exists an user with id provided', async () => {
    jest.spyOn(loadUserRepository, 'loadById').mockResolvedValueOnce(undefined);

    const response = await updateUserService.update('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });

    expect(response).toEqual(new Error('user not found'));
  });

  it('should throw if LoadUserById throws', async () => {
    jest
      .spyOn(loadUserRepository, 'loadById')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserService.update('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });

    await expect(promise).rejects.toThrowError();
  });

  it('Should call UpdateUser with correct data', async () => {
    const updateSpy = jest.spyOn(updateUserRepository, 'updateUser');

    await updateUserService.update('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });
  });

  it('should throw if UpdateUser throws', async () => {
    jest
      .spyOn(updateUserRepository, 'updateUser')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserService.update('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });

    await expect(promise).rejects.toThrowError();
  });

  it('should return null on success', async () => {
    const response = await updateUserService.update('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });

    expect(response).toBeNull();
  });
});
