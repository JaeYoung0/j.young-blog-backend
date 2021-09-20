import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordCheck: string;
}
