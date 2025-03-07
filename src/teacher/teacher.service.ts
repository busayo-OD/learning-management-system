import { Injectable, NotFoundException } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherDto } from './dto/list-teacher.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async saveTeacher(teacher: Teacher): Promise<Teacher> {
    return this.teacherRepository.save(teacher);
  }

  async getLastTeacher(): Promise<Teacher | null> {
    return await this.teacherRepository
      .createQueryBuilder('teacher')
      .orderBy('teacher.id', 'DESC')
      .getOne();
  }

  async getAllTeachers(): Promise<TeacherDto[]> {
    const teachers = await this.teacherRepository.find({
      relations: [
        'user',
        'teacherSubjects',
        'teacherSubjects.subject',
        'teacherSubjects.level',
        'teacherSubjects.section',
      ],
      where: { deletedAt: null }
    });
  
    return teachers.map(teacher => ({
      firstname: teacher.user.firstname,
      lastname: teacher.user.lastname,
      email: teacher.user.email,
      avatar: teacher.user.avatar,
      gender: teacher.user.gender,
      dob: teacher.user.dob,
      address: teacher.user.address,
      state: teacher.user.state,
      country: teacher.user.country,
      phoneNumber: teacher.user.phoneNumber,
      teacherId: teacher.teacherId,
      subjects: teacher.teacherSubjects.map(ts => ({
        subject: ts.subject.subjectName,
        class: ts.level.name,
        section: ts.section?.name || 'N/A',
      })),
      classes: [...new Set(teacher.teacherSubjects.map(ts => ts.level.name))],
    }));
  }
  

  async getTeacherByTeacherId(teacherId: string): Promise<TeacherDto> {
    const teacher = await this.teacherRepository.findOne({
      where: { teacherId, deletedAt: null },
      relations: [
        'user',
        'teacherSubjects',
        'teacherSubjects.subject',
        'teacherSubjects.level',
        'teacherSubjects.section',
      ],
    });
  
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }
  
    return {
      firstname: teacher.user.firstname,
      lastname: teacher.user.lastname,
      email: teacher.user.email,
      avatar: teacher.user.avatar,
      gender: teacher.user.gender,
      dob: teacher.user.dob,
      address: teacher.user.address,
      state: teacher.user.state,
      country: teacher.user.country,
      phoneNumber: teacher.user.phoneNumber,
      teacherId: teacher.teacherId,
      subjects: teacher.teacherSubjects.map(ts => ({
        subject: ts.subject.subjectName,
        class: ts.level.name,
        section: ts.section?.name || 'N/A',
      })),
      classes: [...new Set(teacher.teacherSubjects.map(ts => ts.level.name))],
    };
  }
  

 async softDeleteTeacher(teacherId: string): Promise<boolean> {
       const teacher = await this.teacherRepository.findOne({
         where: { teacherId },
         relations: ['user'],
       });
     
       if (!teacher) {
         throw new Error('Teacher not found');
       }
     
       // Soft delete the teacher record
       await this.teacherRepository.softRemove(teacher);
     
       // Soft delete the user record if they only have the 'teacher' role
       if (teacher.user.roles.length === 1 && teacher.user.roles[0].title === 'teacher') {
         await this.teacherRepository.manager
           .getRepository(User)
           .softRemove(teacher.user);
       }
     
       return true;
     }
     
     async restoreTeacher(teacherId: string): Promise<boolean> {
       const teacher = await this.teacherRepository.findOne({
         where: { teacherId },
         relations: ['user'],
         withDeleted: true, // Include soft-deleted records
       });
     
       if (!teacher) {
         throw new Error('Teacher not found');
       }
     
       // Restore the teacher record
       await this.teacherRepository.recover(teacher);
     
       // Restore the user record if they were soft deleted
       if (teacher.user) {
         await this.teacherRepository.manager
           .getRepository(User)
           .recover(teacher.user);
       }
     
       return true;
     }

  async getTotalTeachers(): Promise<{ total: number }> {
    const count = await this.teacherRepository.count();
    return { total: count };
  }

}
