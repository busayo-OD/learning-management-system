import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountDto } from './dto/count.dto';
import { User } from './entities/user.entity';


@Injectable()
export class CountService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getTotalByRole(roleName: string): Promise<CountDto> {
    const count = await this.userRepository.count({
      where: {
        roles: {
          title: roleName,
        },
      },
      relations: ['roles'],
    });
  
    return { total: count };
  }
  
  
}
