import { Injectable } from '@nestjs/common';
import { Parent } from './entities/parent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
  constructor(
        @InjectRepository(Parent)
        private parentRepository: Repository<Parent>,
      ) {}
    async saveParent(parent: Parent): Promise<Parent> {
      return this.parentRepository.save(parent);
    }
}
