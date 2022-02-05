import { Test, TestingModule } from '@nestjs/testing';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';
import { UserCustomRepository } from '../../infra/database/users/user-custom-repository';
import { CreateUserDto } from '../dtos/create-user-dto';
import { CreateUserService } from '../services/create-user.service';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let bcryptAdapter: BcryptAdapter;
  let userRepository: UserCustomRepository;
  let fakeUser: CreateUserDto;

  beforeAll(() => {
    fakeUser = {
      name: 'any-name',
      phone: '99123456789',
      email: 'any_email@mail.com',
      password: 'any_password',
    };
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateUserService,
          useFactory: (
            userRepository: UserCustomRepository,
            hasher: BcryptAdapter,
          ) => new CreateUserService(userRepository, hasher, userRepository),
          inject: [UserCustomRepository, BcryptAdapter],
        },
        {
          provide: UserCustomRepository,
          useValue: {
            loadByEmail: jest.fn().mockResolvedValue(undefined),
            createUser: jest.fn().mockResolvedValue({ id: 'any_id' }),
          },
        },
        {
          provide: BcryptAdapter,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashed_value'),
          },
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get(UserCustomRepository);
    bcryptAdapter = module.get(BcryptAdapter);
  });

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
  });

  it('should call LoadUserByEmail with correct email', async () => {
    const loadByEmailSpy = jest.spyOn(userRepository, 'loadByEmail');

    await createUserService.create(fakeUser);

    expect(loadByEmailSpy).toHaveBeenCalledTimes(1);
    expect(loadByEmailSpy).toHaveBeenCalledWith(fakeUser.email);
  });

  it('should return an Error if already exists email provided', async () => {
    jest
      .spyOn(userRepository, 'loadByEmail')
      .mockResolvedValueOnce({ id: 'any_id', name: 'any_name' });

    const response = await createUserService.create(fakeUser);

    expect(response).toEqual(new Error('email already registered'));
  });

  it('should throw if LoadUserByEmail throws', async () => {
    jest.spyOn(userRepository, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error('loadByEmail error');
    });

    const promise = createUserService.create(fakeUser);

    await expect(promise).rejects.toEqual(new Error('loadByEmail error'));
  });

  it('should call Hasher with correct value', async () => {
    const hashSpy = jest.spyOn(bcryptAdapter, 'hash');

    await createUserService.create(fakeUser);

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith(fakeUser.password);
  });

  it('should call CreateUserRepository with correct value', async () => {
    const createSpy = jest.spyOn(userRepository, 'createUser');

    await createUserService.create(fakeUser);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(
      Object.assign({}, fakeUser, { password: 'hashed_value' }),
    );
  });

  it('should throw if CreateUserRepository throws', async () => {
    jest.spyOn(userRepository, 'createUser').mockImplementationOnce(() => {
      throw new Error('createUser error');
    });

    const promise = createUserService.create(fakeUser);

    await expect(promise).rejects.toEqual(new Error('createUser error'));
  });

  it('should return an userId on success', async () => {
    const response = await createUserService.create(fakeUser);

    expect(response).toEqual({ id: 'any_id' });
  });
});
