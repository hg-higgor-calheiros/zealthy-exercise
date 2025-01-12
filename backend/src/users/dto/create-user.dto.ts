import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, IsArray, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsString()
    @Optional()
    about_me?: string;

    @IsString()
    @Optional()
    birthday?: string;

    @IsString()
    @Optional()
    address?: string;
}
