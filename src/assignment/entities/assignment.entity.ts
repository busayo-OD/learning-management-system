import { Result } from 'src/result/entities/result.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', nullable: false, name: 'due_date' })
  dueDate: Date;

  @ManyToOne(() => Subject, (course) => course.assignments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Subject;

  @OneToOne(() => Result, (result) => result.assignment, { nullable: true })
  result: Result;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
