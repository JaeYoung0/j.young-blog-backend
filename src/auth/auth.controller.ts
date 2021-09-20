import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './models/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
    });

    return {
      status: 'success',
      email,
    };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    // passthrough 설정: 쿠키/헤더만 설정하고 나머지는 프레임워크에 남겨 두도록 응답객체를 삽입
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = this.usersService.findOne({ email });
    if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

    const validatePassword = await bcrypt.compare(
      password,
      (
        await user
      ).password,
    );
    if (!validatePassword)
      throw new BadRequestException('패스워드를 확인해주세요.');

    // userId로 jwt토큰 발행
    const jwt = await this.jwtService.signAsync({ id: (await user).id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }
}
