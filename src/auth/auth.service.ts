import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
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
import { StaffService } from 'src/staff/staff.service';
import { RegisterStaffDto } from './dto/register-staff.dto';
import { Staff } from 'src/staff/entities/staff.entity';

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
    private readonly staffService: StaffService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  private async createUser(userDto: any): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(userDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    return this.userService.createUser({
      firstname: userDto.firstname,
      lastname: userDto.lastname,
      email: userDto.email,
      password: hashedPassword,
      phoneNumber: userDto.phoneNumber,
      avatar: userDto.avatar,
      dob: userDto.dob,
      gender: userDto.gender,
      address: userDto.address,
      state: userDto.state,
      country: userDto.country,
    });
  }

  async registerStudent(user: RegisterStudentDto): Promise<AccessToken> {
    const newUser = await this.createUser(user);
    const studentRole = await this.roleService.findByTitle('student');
    if (!studentRole) {
      throw new BadRequestException('Student role not found');
    }
    newUser.roles = [studentRole];
    await this.userService.saveUser(newUser);

    const level = await this.levelService.findById(user.classId);
    if (!level) {
      throw new BadRequestException('Level not found');
    }

    const section = user.classSectionId
      ? await this.levelService.findSectionById(
          user.classSectionId,
          user.classId,
        )
      : null;
    const studentId = await this.generateStudentId();

    const newStudent = new Student();
    newStudent.user = newUser;
    newStudent.studentId = studentId;
    newStudent.level = level;
    newStudent.section = section;
    await this.studentService.saveStudent(newStudent);

    return this.login(newUser);
  }

  async registerAdmin(user: RegisterAdminDto): Promise<AccessToken> {
    const newUser = await this.createUser(user);
    const adminRole = await this.roleService.findByTitle('admin');
    if (!adminRole) {
      throw new BadRequestException('Admin role not found');
    }
    newUser.roles = [adminRole];
    await this.userService.saveUser(newUser);
    return this.login(newUser);
  }

  async registerTeacher(user: RegisterTeacherDto): Promise<AccessToken> {
    const newUser = await this.createUser(user);
    const teacherRole = await this.roleService.findByTitle('teacher');
    if (!teacherRole) {
      throw new BadRequestException('Teacher role not found');
    }
    newUser.roles = [teacherRole];
    await this.userService.saveUser(newUser);

    const teacherId = await this.generateTeacherId();
    const newTeacher = new Teacher();
    newTeacher.user = newUser;
    newTeacher.teacherId = teacherId;
    newTeacher.qualification = user.qualification;
    newTeacher.department = user.department;
    await this.teacherService.saveTeacher(newTeacher);

    return this.login(newUser);
  }

  async registerParent(user: RegisterParentDto): Promise<AccessToken> {
    const newUser = await this.createUser(user);
    const parentRole = await this.roleService.findByTitle('parent');
    if (!parentRole) {
      throw new BadRequestException('Parent role not found');
    }
    newUser.roles = [parentRole];
    await this.userService.saveUser(newUser);

    const parentId = await this.generateParentId();
    const students = user.studentIds?.length
      ? await this.studentService.findStudentsByIds(user.studentIds)
      : [];

    const newParent = new Parent();
    newParent.user = newUser;
    newParent.parentId = parentId;
    newParent.students = students;
    await this.parentService.saveParent(newParent);

    return this.login(newUser);
  }

  async registerStaff(user: RegisterStaffDto): Promise<AccessToken> {
    const newUser = await this.createUser(user);
    const staffRole = await this.roleService.findByTitle('staff');
    if (!staffRole) {
      throw new BadRequestException('Staff role not found');
    }
    newUser.roles = [staffRole];
    await this.userService.saveUser(newUser);

    const staffId = await this.generateStaffId();
    const newStaff = new Staff();
    newStaff.user = newUser;
    newStaff.staffId = staffId;
    newStaff.jobTitle = user.jobTitle;
    newStaff.department = user.department;
    await this.staffService.saveStaff(newStaff);

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

  async generateStudentId(): Promise<string> {
    const lastStudent = await this.studentService.getLastStudent();

    let increment = 1;
    if (lastStudent) {
      const lastId = lastStudent.studentId;
      const numericPart = lastId.split('-')[2];
      increment = parseInt(numericPart, 10) + 1;
    }

    const formattedNumber = increment.toString().padStart(5, '0');
    return `NXL-STD-${formattedNumber}`;
  }

  async generateTeacherId(): Promise<string> {
    const lastTeacher = await this.teacherService.getLastTeacher();

    let increment = 1;
    if (lastTeacher) {
      const lastId = lastTeacher.teacherId;
      const numericPart = lastId.split('-')[2];
      increment = parseInt(numericPart, 10) + 1;
    }

    const formattedNumber = increment.toString().padStart(5, '0');
    return `NXL-TEA-${formattedNumber}`;
  }

  async generateParentId(): Promise<string> {
    const lastParent = await this.parentService.getLastParent();

    let increment = 1;
    if (lastParent) {
      const lastId = lastParent.parentId;
      const numericPart = lastId.split('-')[2];
      increment = parseInt(numericPart, 10) + 1;
    }

    const formattedNumber = increment.toString().padStart(5, '0');
    return `NXL-PAR-${formattedNumber}`;
  }

  async generateStaffId(): Promise<string> {
    const lastStaff = await this.staffService.getLastStaff();

    let increment = 1;
    if (lastStaff) {
      const lastId = lastStaff.staffId;
      const numericPart = lastId.split('-')[1];
      increment = parseInt(numericPart, 10) + 1;
    }

    const formattedNumber = increment.toString().padStart(5, '0');
    return `NXL-${formattedNumber}`;
  }
}
