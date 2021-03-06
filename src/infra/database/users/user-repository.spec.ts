import { Test, TestingModule } from '@nestjs/testing';
import { getRepository, Repository } from 'typeorm';
import { UserCustomRepository } from './user-repository';
import { User } from '../entities/user.entity';

const fakeUser = {
  id: 'user_id',
  name: 'any_name',
  phone: 'any_phone',
  email: 'any_email@mail.com',
  password: 'any_password',
  status: true,
};

jest.mock('typeorm', () => ({
  ...jest.requireActual<object>('typeorm'),
  getRepository: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue({ ...fakeUser }),
    save: jest.fn().mockResolvedValue(fakeUser),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOne: jest.fn().mockImplementation((email, _) => fakeUser),
    update: jest.fn().mockResolvedValue({ affectedRows: 1 }),
    softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
  })),
}));

describe('User Repository', () => {
  let userCustomRepository: UserCustomRepository;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    userRepository = getRepository(User);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserCustomRepository,
          useFactory: () => new UserCustomRepository(userRepository),
        },
      ],
    }).compile();

    userCustomRepository =
      module.get<UserCustomRepository>(UserCustomRepository);
  });

  describe('CreateUser', () => {
    it('Should call with correct data', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...fakeData } = fakeUser;
      const createSpy = jest.spyOn(userRepository, 'create');
      const saveSpy = jest.spyOn(userRepository, 'save');

      await userCustomRepository.createUser(fakeData);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(fakeData);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith({ ...fakeUser });
    });

    it('Should return an userId if createUser on success', async () => {
      const { id, ...fakeData } = fakeUser;
      const account = await userCustomRepository.createUser(fakeData);
      expect(account).toBeTruthy();
      expect(account.id).toBe(id);
    });
  });

  describe('LoadByEmail', () => {
    it('Should call with correct data', async () => {
      const findSpy = jest.spyOn(userRepository, 'findOne');

      await userCustomRepository.loadByEmail(fakeUser.email);

      expect(findSpy).toHaveBeenCalledWith(
        { email: fakeUser.email },
        { withDeleted: true },
      );
    });

    it('Should return undefined if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      const response = await userCustomRepository.loadByEmail(fakeUser.email);

      expect(response).toBeUndefined();
    });

    it('Should throw if UserRepository throws', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());

      const promise = userCustomRepository.loadByEmail(fakeUser.email);

      await expect(promise).rejects.toThrowError();
    });

    it('Should return correct data on success', async () => {
      const response = await userCustomRepository.loadByEmail(fakeUser.email);
      expect(response).toBeTruthy();
      expect(response).toEqual(fakeUser);
    });
  });
  describe('LoadById', () => {
    it('Should call with correct data', async () => {
      const findSpy = jest.spyOn(userRepository, 'findOne');

      await userCustomRepository.loadById(fakeUser.id);

      expect(findSpy).toHaveBeenCalledWith({ id: fakeUser.id });
    });

    it('Should return undefined if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      const response = await userCustomRepository.loadById(fakeUser.id);

      expect(response).toBeUndefined();
    });

    it('Should throw if UserRepository throws', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());

      const promise = userCustomRepository.loadById(fakeUser.id);

      await expect(promise).rejects.toThrowError();
    });

    it('Should return correct data on success', async () => {
      const response = await userCustomRepository.loadById(fakeUser.id);
      expect(response).toBeTruthy();
      expect(response).toEqual({
        id: fakeUser.id,
        name: fakeUser.name,
        phone: fakeUser.phone,
        email: fakeUser.email,
        status: fakeUser.status,
      });
    });
  });

  describe('UpdateUser', () => {
    const fakeData = {
      name: 'other_name',
      phone: 'other_phone',
    };
    it('Should call with correct data', async () => {
      const updateSpy = jest.spyOn(userRepository, 'update');

      await userCustomRepository.updateUser('any_id', fakeData);

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith({ id: 'any_id' }, fakeData);
    });

    it('Should throw if UserRepository throws', async () => {
      jest.spyOn(userRepository, 'update').mockRejectedValue(new Error());

      const promise = userCustomRepository.updateUser('any_id', fakeData);

      await expect(promise).rejects.toThrowError();
    });

    it('Should return undefined on success', async () => {
      const response = await userCustomRepository.updateUser(
        'any_id',
        fakeData,
      );

      expect(response).toBeUndefined();
    });
  });

  describe('DeleteUser', () => {
    it('Should call with correct id', async () => {
      const deleteSpy = jest.spyOn(userRepository, 'softDelete');

      await userCustomRepository.deleteById('any_id');

      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith({ id: 'any_id' });
    });

    it('Should throw if UserRepository throws', async () => {
      jest.spyOn(userRepository, 'softDelete').mockRejectedValue(new Error());

      const promise = userCustomRepository.deleteById('any_id');

      await expect(promise).rejects.toThrowError();
    });

    it('Should return undefined on success', async () => {
      const response = await userCustomRepository.deleteById('any_id');

      expect(response).toBeUndefined();
    });
  });
});
