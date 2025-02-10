import { Assignment } from 'src/assignment/entities/assignment.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Assignment, (assignment) => assignment.result)
  @JoinColumn({ name: 'assignment_id' })
  assignment: Assignment;

  @ManyToOne(() => Student, (student) => student.results)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  score: number;

  @Column({ type: 'varchar', length: 2 })
  grade: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' , name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
