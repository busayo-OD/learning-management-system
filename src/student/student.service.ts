import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StudentService {
  constructor(
      @InjectRepository(Student)
      private studentRepository: Repository<Student>,
    ) {}
  async saveStudent(student: Student): Promise<Student> {
    return this.studentRepository.save(student);
  }
}
