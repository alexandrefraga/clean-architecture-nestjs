import { BadRequestException, Body, Controller, Post, Param, Put, ParseUUIDPipe } from '@nestjs/common';
import { UpdateUserService } from '../services/update-user.service';
import { UpdateUserDto } from '../dtos/update-user-dto';

@Controller('user')
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}
  @Put('/:id')
  async handle(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId:string,
    @Body() updateUserDto: UpdateUserDto): Promise<void> {
    const onError = await this.updateUserService.update(userId, updateUserDto)
    if (onError) {
      throw new BadRequestException(onError.message);
    }
  }
}
