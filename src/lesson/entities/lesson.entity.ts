import { Subject } from 'src/subject/entities/subject.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Entity, JoinColumn } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', name: 'schedule_date' })
  scheduleDate: Date;

  @Column({ type: 'varchar', length: 50 })
  duration: string;

  @ManyToOne(() => Subject, (subject) => subject.classes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(() => Attendance, (attendance) => attendance.lesson)
  attendances: Attendance[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
