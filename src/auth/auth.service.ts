import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { AccessToken } from './types/access-token';
import { RegisterStudentDto } from './dto/register-student.dto';
import { StudentService } from 'src/student/student.service';
import { LevelService } from 'src/level/level.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { TeacherService } from 'src/teacher/teacher.service';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { RegisterParentDto } from './dto/register-parent.dto';
import { Parent } from 'src/parent/entities/parent.entity';
import { ParentService } from 'src/parent/parent.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
    private readonly levelService: LevelService,
    private readonly teacherService: TeacherService,
    private readonly parentService: ParentService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async registerStudent(user: RegisterStudentDto): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(user.password, 10);
  
    const newUser = await this.userService.createUser({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: hashedPassword,
      username: (user.firstname + user.lastname).toLowerCase(),
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      address: user.address,
      state: user.state,
      country: user.country,
    });
  
    // Fetch the "student" role from the database
    const studentRole: Role = await this.roleService.findByTitle('student');
    if (!studentRole) {
      throw new BadRequestException('Student role not found');
    }
  
    // Assign the "student" role to the user
    newUser.roles = [studentRole];
  
    await this.userService.saveUser(newUser);
  
    // Fetch the level from the database
    const level = await this.levelService.findById(user.levelId);
    if (!level) {
      throw new BadRequestException('Level not found');
    }
  
    // Create a new student record
    const newStudent = new Student();
    newStudent.user = newUser;
    newStudent.studentId = `STU-${newUser.id}`;
    newStudent.level = level;
    await this.studentService.saveStudent(newStudent);
  
    // Return the login token
    return this.login(newUser);
  }
  
  async registerAdmin(user: RegisterAdminDto): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(user.password, 10);
  
    const newUser = await this.userService.createUser({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: hashedPassword,
      username: (user.firstname + user.lastname).toLowerCase(),
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      address: user.address,
      state: user.state,
      country: user.country,
    });
  
    const adminRole: Role = await this.roleService.findByTitle('admin');
    if (!adminRole) {
      throw new BadRequestException('Admin role not found');
    }
  
    newUser.roles = [adminRole];
  
    await this.userService.saveUser(newUser);
    return this.login(newUser);
  }
  

  async login(user: User): Promise<AccessToken> {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map((role) => role.title),
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async registerTeacher(user: RegisterTeacherDto): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(user.password, 10);
  
    const newUser = await this.userService.createUser({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: hashedPassword,
      username: (user.firstname + user.lastname).toLowerCase(),
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      address: user.address,
      state: user.state,
      country: user.country,
    });
  
    const teacherRole: Role = await this.roleService.findByTitle('teacher');
    if (!teacherRole) {
      throw new BadRequestException('Teacher role not found');
    }
    newUser.roles = [teacherRole];
    await this.userService.saveUser(newUser);
  
    const newTeacher = new Teacher();
    newTeacher.user = newUser;
    newTeacher.teacherId = `TEA-${newUser.id}`;
    newTeacher.qualification = user.qualification;
    newTeacher.department = user.department;
    await this.teacherService.saveTeacher(newTeacher);
  
    return this.login(newUser);
}

async registerParent(user: RegisterParentDto): Promise<AccessToken> {
  const existingUser = await this.userService.findOneByEmail(user.email);
  if (existingUser) {
    throw new BadRequestException('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = await this.userService.createUser({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: hashedPassword,
    username: (user.firstname + user.lastname).toLowerCase(),
    phoneNumber: user.phoneNumber,
    avatar: user.avatar,
    address: user.address,
    state: user.state,
    country: user.country,
  });

  const parentRole: Role = await this.roleService.findByTitle('parent');
  if (!parentRole) {
    throw new BadRequestException('Parent role not found');
  }

  newUser.roles = [parentRole];

  await this.userService.saveUser(newUser);

  const newParent = new Parent();
  newParent.user = newUser;
  newParent.parentId = `PAR-${newUser.id}`;
  await this.parentService.saveParent(newParent);

  return this.login(newUser);
}


}
