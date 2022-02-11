import { LoadUserByIdRepository } from '../protocols/load-user-by-id-repository';
import { UpdateUserService } from '../services/update-user.service';
import { mock, MockProxy } from 'jest-mock-extended';

describe('UpdateUser Service', () => {
  let updateUserService: UpdateUserService;
  let userRepository: MockProxy<LoadUserByIdRepository>;

  beforeEach(() => {
    userRepository = mock();
    userRepository.loadById.mockResolvedValue({
      id: 'user_id',
      name: 'user_name',
      phone: 'user_phone',
      email: 'user@mail.com',
      status: true,
    })
    updateUserService = new UpdateUserService(userRepository);
  });

  it('Should call loadUserById with correct id', async () => {
    const loadByIdSpy = jest.spyOn(userRepository, 'loadById');

    await updateUserService.update('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });

    expect(loadByIdSpy).toHaveBeenCalledTimes(1);
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('should return an Error if not exists an user with id provided', async () => {
    jest.spyOn(userRepository, 'loadById').mockResolvedValueOnce(undefined);

    const response = await updateUserService.update('any_id', {
      name: 'any_name',
      phone: 'any_phone_number',
    });

    expect(response).toEqual(new Error('user not found'));
  });

  it('should throw if LoadUserById throws', async () => {
    jest.spyOn(userRepository, 'loadById').mockRejectedValueOnce(new Error())

    const promise = updateUserService.update('any_id', { name: 'any_name', phone: 'any_phone_number' });

    await expect(promise).rejects.toThrowError()
  });
  
});
