import { Test, TestingModule } from '@nestjs/testing';
import { getRepository } from 'typeorm';
import { UserCustomRepository } from './user-repository';
import { User } from './user.entity';

const fakeUser = {
  id: 'user_id',
  name: 'any_name',
  phone: 'any_phone',
  email: 'any_email@mail.com',
  password: 'any_password',
};

jest.mock('typeorm', () => ({
  ...jest.requireActual<object>('typeorm'),
  getRepository: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue(fakeUser),
    save: jest.fn().mockResolvedValue(fakeUser),
    findOne: jest.fn().mockResolvedValue(fakeUser),
    update: jest.fn().mockResolvedValue({ affectedRows: 1 })
  })),
}));

describe('User Repository', () => {
  let userRepository: UserCustomRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserCustomRepository,
          useFactory: () => new UserCustomRepository(getRepository(User)),
        },
      ],
    }).compile();

    userRepository = module.get<UserCustomRepository>(UserCustomRepository);
  });

  describe('CreateUser', () => {
    it('Should return an userId if createUser on success', async () => {
      const { id, ...fakeData } = fakeUser;
      const account = await userRepository.createUser(fakeData);
      expect(account).toBeTruthy();
      expect(account.id).toBe(id);
    });
  });

  describe('LoadByEmail', () => {
    it('Should return correct data on success', async () => {
      const response = await userRepository.loadByEmail(fakeUser.email);
      expect(response).toBeTruthy();
      expect(response).toEqual({
        id: fakeUser.id,
        name: fakeUser.name,
      });
    });
  });

  describe('UpdateUser', () => {
    it('Should return undefined on success', async () => {
      const response = await userRepository.updateUser('any_id', {
        name: 'other_name',
        phone: 'other_phone',
      })

      expect(response).toBeUndefined()
    })
  });
});
