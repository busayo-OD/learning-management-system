import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Level } from 'src/level/entities/level.entity';
import { Section } from 'src/level/entities/section.entity';
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
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'student_id' })
  studentId: string;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Parent, (parent) => parent.students)
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];

  @ManyToOne(() => Level, level => level.students)
  @JoinColumn({ name: 'class_id' })
  level: Level;

  @ManyToOne(() => Section, (section) => section.students, { nullable: true })
  @JoinColumn({ name: 'section_id' })
  section: Section; // Links student to Section (optional)

  @CreateDateColumn({ type: 'timestamp' , name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null; // Nullable to allow soft deletes
}
