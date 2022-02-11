import { Test, TestingModule } from '@nestjs/testing';
import { getRepository, Repository } from 'typeorm';
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
    create: jest.fn().mockResolvedValue({ ...fakeUser, status: true }),
    save: jest.fn().mockResolvedValue(fakeUser),
    findOne: jest.fn().mockImplementation((email, _) => fakeUser),
    update: jest.fn().mockResolvedValue({ affectedRows: 1 })
  })),
}));

describe('User Repository', () => {
  let userCustomRepository: UserCustomRepository;
  let userRepository: Repository<User>

  beforeEach(async () => {
    userRepository = getRepository(User)
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserCustomRepository,
          useFactory: () => new UserCustomRepository(userRepository),
        },
      ],
    }).compile();

    userCustomRepository = module.get<UserCustomRepository>(UserCustomRepository);
    
  });

  describe('CreateUser', () => {
    it('Should call with correct data', async () => {
      const { id, ...fakeData } = fakeUser;
      const createSpy = jest.spyOn(userRepository, 'create')
      const saveSpy = jest.spyOn(userRepository, 'save')

      await userCustomRepository.createUser(fakeData);

      expect(createSpy).toHaveBeenCalledTimes(1)
      expect(createSpy).toHaveBeenCalledWith(fakeData)
      expect(saveSpy).toHaveBeenCalledTimes(1)
      expect(saveSpy).toHaveBeenCalledWith({ ...fakeUser, status: true })
    })

    it('Should return an userId if createUser on success', async () => {
      const { id, ...fakeData } = fakeUser;
      const account = await userCustomRepository.createUser(fakeData);
      expect(account).toBeTruthy();
      expect(account.id).toBe(id);
    });
  });

  describe('LoadByEmail', () => {
    it('Should call with correct data', async () => {
      const findSpy= jest.spyOn(userRepository, 'findOne')

      await userCustomRepository.loadByEmail(fakeUser.email)

      expect(findSpy).toHaveBeenCalledWith({ email: fakeUser.email}, {withDeleted: true})      
    });

    it('Should return undefined if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined)

      const response = await userCustomRepository.loadByEmail(fakeUser.email)

      expect(response).toBeUndefined()
    })

    it('Should throw if UserRepository throws', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error())

      const promise = userCustomRepository.loadByEmail(fakeUser.email)

      await expect(promise).rejects.toThrowError()
    })

    it('Should return correct data on success', async () => {
      const response = await userCustomRepository.loadByEmail(fakeUser.email);
      expect(response).toBeTruthy();
      expect(response).toEqual({
        id: fakeUser.id,
        name: fakeUser.name,
      });
    });
  });

  describe('UpdateUser', () => {
    const fakeData = {
      name: 'other_name',
      phone: 'other_phone',
    }
    it('Should call with correct data', async () => {
      const updateSpy = jest.spyOn(userRepository, 'update')

      await userCustomRepository.updateUser('any_id', fakeData)

      expect(updateSpy).toHaveBeenCalledTimes(1)
      expect(updateSpy).toHaveBeenCalledWith({ id: 'any_id' }, fakeData)
    })

    it('Should throw if UserRepository throws', async () => {
      jest.spyOn(userRepository, 'update').mockRejectedValue(new Error())

      const promise = userCustomRepository.updateUser('any_id', fakeData)

      await expect(promise).rejects.toThrowError()
    })

    it('Should return undefined on success', async () => {
      const response = await userCustomRepository.updateUser('any_id', fakeData)

      expect(response).toBeUndefined()
    })
  });
});
