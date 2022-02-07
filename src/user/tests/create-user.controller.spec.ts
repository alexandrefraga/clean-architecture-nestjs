import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '../controllers/create-user.controller';
import { CreateUserDto } from '../dtos/create-user-dto';
import { CreateUserService } from '../services/create-user.service';

describe('CreateUserController', () => {
  let createUsercontroller: CreateUserController;
  let createUserService: CreateUserService;
  let fakeCreateUserDto: CreateUserDto;

  beforeAll(() => {
    fakeCreateUserDto = {
      name: 'any_name',
      phone: '51999888777',
      email: 'any_email@mail.com',
      password: 'any_password',
    };
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 'any_id' }),
          },
        },
      ],
    }).compile();

    createUsercontroller =
      module.get<CreateUserController>(CreateUserController);
    createUserService = module.get(CreateUserService);
  });

  it('should be defined', () => {
    expect(createUsercontroller).toBeDefined();
  });

  it('should call CreateUserService with correct value', async () => {
    const createSpy = jest.spyOn(createUserService, 'create');

    await createUsercontroller.handle(fakeCreateUserDto);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(fakeCreateUserDto);
  });

  it('should trow if CreateUserService throws', async () => {
    jest.spyOn(createUserService, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = createUsercontroller.handle(fakeCreateUserDto);

    await expect(promise).rejects.toThrowError();
  });

  it('should trow if CreateUserService on error', async () => {
    jest
      .spyOn(createUserService, 'create')
      .mockResolvedValueOnce(new Error('any_error'));

    const promise = createUsercontroller.handle(fakeCreateUserDto);

    await expect(promise).rejects.toEqual(new BadRequestException('any_error'));
  });

  it('should return undefined on success', async () => {
    const response = await createUsercontroller.handle(fakeCreateUserDto);

    expect(response).toBeUndefined();
  });
});
