import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,

    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  // Find a level by its ID
  async findById(id: number): Promise<Level> {
    return this.levelRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }

  async findSectionById(sectionId: number, levelId: number): Promise<Section> {
    const section = await this.sectionRepository.findOne({
      where: { id: sectionId, level: { id: levelId } },
    });
    if (!section) {
      throw new NotFoundException('Section not found or does not belong to this level');
    }
    return section;
  }
}
