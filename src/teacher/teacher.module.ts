import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountService } from 'src/user/user.count.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, User])],
  controllers: [TeacherController],
  providers: [TeacherService, CountService],
  exports: [TeacherService, CountService],
})
export class TeacherModule {}
