import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './models/register.dto';
import * as bcrypt from 'bcryptjs';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { email, phone, password, passwordCheck } = body;

    if (password !== passwordCheck) {
      throw new BadRequestException({
        field: 'password',
        message: '패스워드가 일치하지 않습니다!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersService.create({
      email,
      phone,
      password: hashedPassword,
    });

    return {
      status: 'success',
      email,
    };
  }
}
