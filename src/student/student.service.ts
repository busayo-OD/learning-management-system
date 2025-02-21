import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { In, Repository } from 'typeorm';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
  constructor(
      @InjectRepository(Student)
      private studentRepository: Repository<Student>,
    ) {}

  async saveStudent(student: Student): Promise<Student> {
    return this.studentRepository.save(student);
  }

  async getLastStudent(): Promise<Student | null> {
          return await this.studentRepository
            .createQueryBuilder('student')
            .orderBy('student.id', 'DESC')
            .getOne();
        }

  async findStudentsByIds(studentIds: string[]): Promise<Student[]> {
    if (!studentIds || studentIds.length === 0) {
      return [];
    }
  
    // Fetch students using studentId
    return this.studentRepository.findBy({ studentId: In(studentIds) });
  }
        
  async getTotalStudents(): Promise<{ total: number }> {
    const count = await this.studentRepository.count();
    return { total: count };
  }

  async getAllStudents(): Promise<StudentDto[]> {
    const students = await this.studentRepository.find({
      relations: ['user', 'level', 'section'],
    });

    return students.map(student => ({
      firstname: student.user.firstname,
      lastname: student.user.lastname,
      email: student.user.email,
      avatar: student.user.avatar,
      gender: student.user.gender,
      dob: student.user.dob,
      address: student.user.address,
      state: student.user.state,
      country: student.user.country,
      phoneNumber: student.user.phoneNumber,
      studentId: student.studentId,
      class: student.level?.name,
      section: student.section?.name || 'N/A',
    }));
  }
}

