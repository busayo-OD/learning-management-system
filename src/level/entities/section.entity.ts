import { Level } from 'src/level/entities/level.entity';
import { Student } from 'src/student/entities/student.entity';
import { TeacherSubject } from 'src/teacher/entities/teacher-subject.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('class_section')
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // Example: 'A', 'B', 'C'

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Level, (level) => level.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_id' })
  level: Level; // Links Section to a specific Level (SS1, SS2)

  @OneToMany(() => Student, (student) => student.section)
  students: Student[];

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.section)
  teacherSubjects: TeacherSubject[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
  
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
