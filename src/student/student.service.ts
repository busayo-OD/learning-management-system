import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { In, Repository } from 'typeorm';
import { StudentDto } from './dto/student.dto';
import { User } from 'src/user/entities/user.entity';

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
    
    async getAllStudents(): Promise<StudentDto[]> {
      const students = await this.studentRepository.find({
        relations: ['user', 'level', 'section'],
        where: { deletedAt: null }, // Exclude soft-deleted records
      });
    
      return students.map((student) => ({
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

    async getStudentById(studentId: string): Promise<StudentDto | null> {
      const student = await this.studentRepository.findOne({
        where: { studentId: studentId, deletedAt: null },
        relations: ['user', 'level', 'section'],
      });
  
      if (!student) return null;
  
      return {
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
      };
    }

    async softDeleteStudent(studentId: string): Promise<boolean> {
      const student = await this.studentRepository.findOne({
        where: { studentId },
        relations: ['user'],
      });
    
      if (!student) {
        throw new Error('Student not found');
      }
    
      // Soft delete the student record
      await this.studentRepository.softRemove(student);
    
      // Soft delete the user record if they only have the 'student' role
      if (student.user.roles.length === 1 && student.user.roles[0].title === 'student') {
        await this.studentRepository.manager
          .getRepository(User)
          .softRemove(student.user);
      }
    
      return true;
    }
    
    async restoreStudent(studentId: string): Promise<boolean> {
      const student = await this.studentRepository.findOne({
        where: { studentId },
        relations: ['user'],
        withDeleted: true, // Include soft-deleted records
      });
    
      if (!student) {
        throw new Error('Student not found');
      }
    
      // Restore the student record
      await this.studentRepository.recover(student);
    
      // Restore the user record if they were soft deleted
      if (student.user) {
        await this.studentRepository.manager
          .getRepository(User)
          .recover(student.user);
      }
    
      return true;
    }
       
    
}

