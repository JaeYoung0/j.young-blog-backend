import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   *
   * @param command id,email과 같이 unique한 field값을 받는 객체 ... {id} {email}
   * @param options FindOneOptions
   */
  findOne(command, options?): Promise<User> {
    return this.userRepository.findOne(command, options);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(data): Promise<User> {
    try {
      return this.userRepository.save(data);
    } catch (error) {
      console.error(error);

      throw new BadRequestException({
        status: 'error',
        error,
      });
    }
  }
}
