import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: number;

  role_id: number;
}
