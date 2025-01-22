import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Level } from 'src/level/entities/level.entity';
import { Parent } from 'src/parent/entities/parent.entity';
import { Result } from 'src/result/entities/result.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  studentId: string;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Parent, (parent) => parent.students)
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];

  @ManyToOne(() => Level, level => level.students)
  @JoinColumn({ name: 'class_id' })
  level: Level;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
