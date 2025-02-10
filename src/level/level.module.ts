import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Section } from './entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level, Section])],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService]
})
export class LevelModule {}
