import { Controller, Get, Inject } from '@nestjs/common';
import { SERVICES } from '../constants';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(SERVICES.LOAD_USERS_SERVICE) private userService: UserService,
  ) {}

  @Get()
  async findAllUsers(): Promise<any> {
    return await this.userService.loadUsers();
  }
}
