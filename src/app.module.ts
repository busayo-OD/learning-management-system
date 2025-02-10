import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ResultModule } from './result/result.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ParentModule } from './parent/parent.module';
import { LessonModule } from './lesson/lesson.module';
import { RoleModule } from './role/role.module';
import { StaffModule } from './staff/staff.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LevelModule } from './level/level.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import typeorm from './config/typeorm';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    UserModule,
    StudentModule,
    TeacherModule,
    SubjectModule,
    ResultModule,
    AttendanceModule,
    AssignmentModule,
    ParentModule,
    LessonModule,
    RoleModule,
    StaffModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    LevelModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
