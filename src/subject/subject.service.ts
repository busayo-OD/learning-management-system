import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { AssignSubjectDto } from './dto/assign-subject.dto';
import { TeacherSubject } from 'src/teacher/entities/teacher-subject.entity';
import { Level } from 'src/level/entities/level.entity';
import { SubjectDto } from './dto/list-subject.dto';
import { Section } from 'src/level/entities/section.entity';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    @InjectRepository(TeacherSubject)
    private readonly teacherSubjectRepository: Repository<TeacherSubject>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,


  ) {}

  async createSubject(createSubjectDto: CreateSubjectDto): Promise<boolean> {
    const subject = this.subjectRepository.create(createSubjectDto);
    await this.subjectRepository.save(subject);
    return true;
}

  async assignSubject(assignSubjectDto: AssignSubjectDto): Promise<boolean> {
    try {
        const { subjectCode, teacherId, classId, classSectionId } = assignSubjectDto;
    
        const subject = await this.subjectRepository.findOne({ where: { subjectCode } });
        if (!subject) throw new NotFoundException('Subject not found');
    
        const teacher = await this.teacherRepository.findOne({ where: { teacherId } });
        if (!teacher) throw new NotFoundException('Teacher not found');
    
        const level = await this.levelRepository.findOne({ where: { id: classId } });
        if (!level) throw new NotFoundException('Level not found');
    
        let section: Section | null = null;
        if (classSectionId) {
            section = await this.sectionRepository.findOne({ where: { id: classSectionId } });
            if (!section) throw new NotFoundException('Section not found');
        }
    
        // Check if the assignment already exists
        const existingAssignment = await this.teacherSubjectRepository.findOne({
          where: { teacher, subject, level, section },
        });
    
        if (existingAssignment) throw new ConflictException('Teacher is already assigned to this subject for this level and section');
    
        // Create a new TeacherSubject entry
        const teacherSubject = this.teacherSubjectRepository.create({
          teacher,
          subject,
          level,
          section,
        });
    
        await this.teacherSubjectRepository.save(teacherSubject);
        
        return true;
    } catch (error) {
        console.error('Error in assignSubject:', error);
        return false;
    }
}


  async getAllSubjects(): Promise<SubjectDto[]> {
    const subjects = await this.subjectRepository.find();
    return subjects.map(subject => ({
      id: subject.id,
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      description: subject.description || 'No description available',
    }));
  }

  async getSubjectById(id: number): Promise<SubjectDto> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Subject not found');
    return {
      id: subject.id,
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      description: subject.description || 'No description available',
    };
  }

  async updateSubject(id: number, updateSubjectDto: UpdateSubjectDto): Promise<boolean> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Subject not found');
    
    await this.subjectRepository.update(id, updateSubjectDto);
    return true;
  }

  async deleteSubject(id: number): Promise<boolean> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Subject not found');
    
    await this.subjectRepository.remove(subject);
    return true;
  }
  
}
