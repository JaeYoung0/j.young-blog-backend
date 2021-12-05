import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  // @ApiProperty()
  email: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordCheck: string;
}
