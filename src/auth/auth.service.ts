import { Injectable, BadRequestException, UseGuards } from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    const validatePassword = await bcrypt.compare(password, user.password);

    if (validatePassword) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new BadRequestException('패스워드를 확인해주세요.');
    }

    // return null;
  }

  async login(user: any) {
    console.log('@@user', user);

    const payload = { username: user.username, sub: user.userId };
    return {
      hid: this.jwtService.sign(payload),
    };
  }
}
