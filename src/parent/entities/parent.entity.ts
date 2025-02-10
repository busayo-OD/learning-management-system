import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'parent_id' })
  parentId: string;

  @OneToOne(() => User, (user) => user.parent)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Student, (student) => student.parent)
  students: Student[];

  @CreateDateColumn({ type: 'timestamp' , name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
