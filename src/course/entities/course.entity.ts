import { Assignment } from 'src/assignment/entities/assignment.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  courseCode: string;

  @Column({ type: 'varchar', length: 255 })
  courseName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' }) // Ensures proper foreign key
  teacher: Teacher;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments: Assignment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
