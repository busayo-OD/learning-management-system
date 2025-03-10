
import { config as dotenvConfig } from 'dotenv';
import { ConfigService, registerAs } from '@nestjs/config';
import { Assignment } from "src/assignment/entities/assignment.entity";
import { Attendance } from "src/attendance/entities/attendance.entity";
import { Lesson } from "src/lesson/entities/lesson.entity";
import { Level } from "src/level/entities/level.entity";
import { Parent } from "src/parent/entities/parent.entity";
import { Result } from "src/result/entities/result.entity";
import { Role } from "src/role/entities/role.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { User } from "src/user/entities/user.entity";

import { DataSource, DataSourceOptions } from 'typeorm';
import { Subject } from 'src/subject/entities/subject.entity';
import { TeacherSubject } from 'src/teacher/entities/teacher-subject.entity';
import { Section } from 'src/level/entities/section.entity';

dotenvConfig({ path: '.env' });

const configService = new ConfigService();

const config = {
  
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST'),
  port: configService.get<number>('MYSQL_PORT') || 3306,
  username: configService.get<string>('MYSQL_USER'),
  password: configService.get<string>('MYSQL_PASSWORD'),
  database: configService.get<string>('MYSQL_DB'),
  entities: [
    Assignment,
    Attendance,
    Subject,
    Lesson,
    Level,
    Section,
    Parent,
    Result,
    Role,
    Staff,
    Student,
    Teacher,
    TeacherSubject,
    User,
  ],
  migrations: ["dist/migrations/*{.ts,.js}"],
  synchronize: false,
  autoLoadEntities: true,
  logging: true,
}
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);



