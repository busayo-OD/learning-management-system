import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Level } from 'src/level/entities/level.entity';
import { Section } from 'src/level/entities/section.entity';

@Entity('teacher_subject')
export class TeacherSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherSubjects, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToOne(() => Subject, (subject) => subject.teacherSubjects, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => Level, (level) => level.teacherSubjects, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_id' })
  level: Level; // Represents SS1, SS2, etc.

  @ManyToOne(() => Section, (section) => section.teacherSubjects, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'section_id' })
  section?: Section; // Science, Art, Commercial (Nullable)
}
