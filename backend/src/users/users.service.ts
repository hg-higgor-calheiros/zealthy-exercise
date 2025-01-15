import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.insert(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new Error('User not found');

    return this.usersRepository.update({ id }, updateUserDto);
  }

  async auth({ email, password }: AuthUserDto): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) throw new Error('User not found');

    if (user.password === password) {
      return 'testToken123';
    }
  }
}
