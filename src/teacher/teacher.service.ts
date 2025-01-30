import { Injectable } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
        @InjectRepository(Teacher)
        private studentRepository: Repository<Teacher>,
      ) {}
  async saveTeacher(teacher: Teacher): Promise<Teacher> {
      return this.studentRepository.save(teacher);
    }
}
