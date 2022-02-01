import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<any> {
    return await this.userService.findAll();
  }
}
