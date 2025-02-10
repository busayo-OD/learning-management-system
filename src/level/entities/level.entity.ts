import { Student } from 'src/student/entities/student.entity';
import { TeacherSubject } from 'src/teacher/entities/teacher-subject.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Section } from './section.entity';

@Entity('class')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Student, (student) => student.level)
  students: Student[];

  @OneToMany(() => Section, (section) => section.level)
  sections: Section[];

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.level)
  teacherSubjects: TeacherSubject[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
