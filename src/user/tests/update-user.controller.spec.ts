import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserController } from '../controllers/update-user.controller';
import { UpdateUserService } from '../services/update-user.service';
import { UpdateUserDto } from '../dtos/update-user-dto';

describe('UpdateUserController', () => {
  let updateUsercontroller: UpdateUserController;
  let updateUserService: UpdateUserService;
  let fakeUpdateUserDto: UpdateUserDto;

  beforeAll(() => {
    fakeUpdateUserDto = {
      name: 'any_name',
      phone: '51999888777',
    };
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [
        {
          provide: UpdateUserService,
          useValue: {
            update: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    updateUsercontroller =
      module.get<UpdateUserController>(UpdateUserController);
    updateUserService = module.get(UpdateUserService);
  });

  it('should be defined', () => {
    expect(updateUsercontroller).toBeDefined();
  });

  it('should call UpdateUserService with correct value', async () => {
    const updateSpy = jest.spyOn(updateUserService, 'update');

    await updateUsercontroller.handle('userId', fakeUpdateUserDto);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith('userId', fakeUpdateUserDto);
  });

  it('should trow if UpdateUserService throws', async () => {
    jest.spyOn(updateUserService, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = updateUsercontroller.handle('userId', fakeUpdateUserDto);

    await expect(promise).rejects.toThrowError();
  });

  it('should trow if UpdateUserService on error', async () => {
    jest
      .spyOn(updateUserService, 'update')
      .mockResolvedValueOnce(new Error('any_error'));

    const promise = updateUsercontroller.handle('userId', fakeUpdateUserDto);

    await expect(promise).rejects.toEqual(new BadRequestException('any_error'));
  });

  it('should return undefined on success', async () => {
    const response = await updateUsercontroller.handle(
      'userId',
      fakeUpdateUserDto,
    );

    expect(response).toBeUndefined();
  });
});
