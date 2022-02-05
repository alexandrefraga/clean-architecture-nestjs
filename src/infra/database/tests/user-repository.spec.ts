import { UserCustomRepository } from '../users/user-custom-repository';
import { UserRepository } from '../users/user-repository';

jest.mock('typeorm', () => ({
  ...jest.requireActual<object>('typeorm'),
  getCustomRepository: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue({
      id: 'user_id',
      name: 'any_name',
      phone: 'any_phone',
      email: 'any_email@mail.com',
      password: 'any_password',
    }),
    save: jest.fn().mockResolvedValue({
      id: 'user_id',
      name: 'any_name',
      phone: 'any_phone',
      email: 'any_email@mail.com',
      password: 'any_password',
    }),
  })),
}));

describe('User Repository', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });
  it('Should return an userId if createUser on success', async () => {
    const userCustomRepository = new UserCustomRepository(userRepository);
    const account = await userCustomRepository.createUser({
      name: 'any_name',
      phone: '51999888777',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    expect(account).toBeTruthy();
  });
});
