import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { CountService } from 'src/user/user.count.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User])],
  controllers: [StudentController],
  providers: [StudentService, CountService],
  exports: [StudentService, CountService ]
})
export class StudentModule {}
