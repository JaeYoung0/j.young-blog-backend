import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
  NotFoundException,
  Res,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './models/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LocalLoginDto } from './models/login.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

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
      provider: 'local',
    });

    return {
      status: 'success',
      email,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('@@req.user', req.user);

    return this.authService.login(req.user);
  }

  @Post('login/kakao')
  async loginKakao() {
    return {
      test: 'test',
    };
  }
}
