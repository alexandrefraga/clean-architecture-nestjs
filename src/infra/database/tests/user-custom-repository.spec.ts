import { UserCustomRepository } from '../users/user-custom-repository';
import { UserRepository } from '../users/user-repository';

const fakeUser = {
  id: 'user_id',
  name: 'any_name',
  phone: 'any_phone',
  email: 'any_email@mail.com',
  password: 'any_password',
};

jest.mock('typeorm', () => ({
  ...jest.requireActual<object>('typeorm'),
  getCustomRepository: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue(fakeUser),
    save: jest.fn().mockResolvedValue(fakeUser),
    findOne: jest.fn().mockResolvedValue(fakeUser),
  })),
}));

describe('User Custom Repository', () => {
  let userRepository: UserRepository;
  let userCustomRepository: UserCustomRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
    userCustomRepository = new UserCustomRepository(userRepository);
  });

  describe('CreateUser', () => {
    it('Should return an userId if createUser on success', async () => {
      const { id, ...fakeData } = fakeUser;
      const account = await userCustomRepository.createUser(fakeData);
      expect(account).toBeTruthy();
      expect(account.id).toBe(id);
    });
  });

  describe('LoadByEmail', () => {
    it('Should return correct data on success', async () => {
      const response = await userCustomRepository.loadByEmail(fakeUser.email);
      expect(response).toBeTruthy();
      expect(response).toEqual({
        id: fakeUser.id,
        name: fakeUser.name,
      });
    });
  });
});
