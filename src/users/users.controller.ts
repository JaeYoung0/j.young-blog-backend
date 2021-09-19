import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserCreateDto } from './models/user-create.dto';
import { User } from './models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async all() {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    return this.usersService.create(body);
  }
}
