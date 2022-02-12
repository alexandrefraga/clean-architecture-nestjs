import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserController } from '../controllers/delete-user.controller';
import { DeleteUserService } from '../services/delete-user.service';

describe('DeleteUserController', () => {
  let deleteUsercontroller: DeleteUserController;
  let deleteUserService: DeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserController],
      providers: [
        {
          provide: DeleteUserService,
          useValue: {
            deleteById: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    deleteUsercontroller =
      module.get<DeleteUserController>(DeleteUserController);
    deleteUserService = module.get(DeleteUserService);
  });

  it('should be defined', () => {
    expect(deleteUsercontroller).toBeDefined();
  });

  it('should call DeleteUserService with correct value', async () => {
    const deleteSpy = jest.spyOn(deleteUserService, 'deleteById');

    await deleteUsercontroller.handle('userId');

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith('userId');
  });

  it('should trow if DeleteUserService throws', async () => {
    jest.spyOn(deleteUserService, 'deleteById').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = deleteUsercontroller.handle('userId');

    await expect(promise).rejects.toThrowError();
  });

  it('should trow if DeleteUserService on error', async () => {
    jest
      .spyOn(deleteUserService, 'deleteById')
      .mockResolvedValueOnce(new Error('any_error'));

    const promise = deleteUsercontroller.handle('userId');

    await expect(promise).rejects.toEqual(new BadRequestException('any_error'));
  });

  it('should return undefined on success', async () => {
    const response = await deleteUsercontroller.handle('userId');

    expect(response).toBeUndefined();
  });
});
