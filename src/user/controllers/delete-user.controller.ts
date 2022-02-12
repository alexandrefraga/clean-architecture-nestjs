import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DeleteUserService } from '../services/delete-user.service';

@Controller('user')
export class DeleteUserController {
  constructor(private deleteUseService: DeleteUserService) {}

  @Delete('/:id')
  async handle(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
  ): Promise<void> {
    const onError = await this.deleteUseService.deleteById(userId);
    if (onError) {
      throw new BadRequestException(onError.message);
    }
  }
}
