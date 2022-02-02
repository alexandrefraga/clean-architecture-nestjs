import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { SERVICES } from '../constants';
import { CreateUserDto } from '../dtos/create-user-dto';
import { CreateUserService } from '../services/create-user.service';

@Controller('user')
export class CreateUserController {
  constructor(
    @Inject(SERVICES.CREATE_USER_SERVICE)
    private createUserService: CreateUserService,
  ) {}
  @Post('/create')
  async handle(@Body() createUserDto: CreateUserDto): Promise<void> {
    const userIdOrError = await this.createUserService.create(createUserDto);
    if (userIdOrError instanceof Error) {
      throw new BadRequestException(userIdOrError.message);
    }
  }
}
