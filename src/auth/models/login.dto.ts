import { IsEmail, IsNotEmpty } from 'class-validator';

export class LocalLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
