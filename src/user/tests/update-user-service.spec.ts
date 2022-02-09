import { LoadUserById } from '../protocols/load-user-by-id.protocols';
import { UpdateUserService } from '../services/update-user.service';
import { mock, MockProxy } from 'jest-mock-extended';

describe('UpdateUser Service', () => {
  let updateUserService: UpdateUserService;
  let userRepository: MockProxy<LoadUserById>;

  beforeEach(() => {
    userRepository = mock();
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
});
