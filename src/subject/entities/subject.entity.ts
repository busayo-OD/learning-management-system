import { Assignment } from 'src/assignment/entities/assignment.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { TeacherSubject } from 'src/teacher/entities/teacher-subject.entity';

import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from 'typeorm';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true, name: 'subject_code' })
  subjectCode: string;

  @Column({ type: 'varchar', length: 255, name: 'subject_name' })
  subjectName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.subject)
  teacherSubjects: TeacherSubject[];

  @OneToMany(() => Lesson, (lesson) => lesson.subject)
  classes: Lesson[];

  @OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments: Assignment[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
