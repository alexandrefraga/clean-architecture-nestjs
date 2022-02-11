import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user-dto';
import { CreateUserService } from '../services/create-user.service';

@Controller('user')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}
  @Post()
  async handle(@Body() createUserDto: CreateUserDto): Promise<void> {
    const userIdOrError = await this.createUserService.create(createUserDto);
    if (userIdOrError instanceof Error) {
      throw new BadRequestException(userIdOrError.message);
    }
  }
}
