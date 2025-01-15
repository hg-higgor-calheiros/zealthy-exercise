import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
