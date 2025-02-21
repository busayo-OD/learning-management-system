import { Injectable, NotFoundException } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherDto } from './dto/list-teacher.dto';

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
      where: { teacherId },
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
  

  async deleteTeacher(teacherId: string): Promise<void> {
    const result = await this.teacherRepository.delete({ teacherId });
    if (result.affected === 0) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }
  }

  async getTotalTeachers(): Promise<{ total: number }> {
    const count = await this.teacherRepository.count();
    return { total: count };
  }

}
