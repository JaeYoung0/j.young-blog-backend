import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './models/register.dto';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { email, phone, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.usersService.create({
      email,
      phone,
      password: hashedPassword,
    });
  }
}
