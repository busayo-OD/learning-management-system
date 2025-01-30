import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    console.log('🔍 Fetching user with roles:', email);
    
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'], // Ensure roles are loaded
    });
  
    console.log('👤 Retrieved user:', user);
    return user;
  }
  
  

  async findOneById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(userId: string, userInformation: Partial<User>): Promise<UpdateResult> {
    return await this.userRepository.update(userId, userInformation);
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

 
}
