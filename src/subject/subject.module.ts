import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherSubject } from 'src/teacher/entities/teacher-subject.entity';
import { Level } from 'src/level/entities/level.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { Section } from 'src/level/entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Teacher, Level, TeacherSubject, Section]), TeacherModule,],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService]
})
export class SubjectModule {}
