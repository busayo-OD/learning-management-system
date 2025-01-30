import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  // Find a level by its ID
  async findById(id: number): Promise<Level> {
    return this.levelRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
