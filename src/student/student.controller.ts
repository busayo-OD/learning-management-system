import { Controller, Get, Param, Delete, Patch } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CountDto } from 'src/user/dto/count.dto';
import { CountService } from 'src/user/user.count.service';
import { StudentDto } from './dto/student.dto';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly countService: CountService,
  ) {}

  @ApiOkResponse({ type: CountDto })
  @Get('/count')
  async getTotalStudents(): Promise<CountDto> {
    return this.countService.getTotalByRole('student');
  }

  @ApiOkResponse({
    type: StudentDto,
    isArray: true,
  })
  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @ApiOkResponse({ type: StudentDto })
  @Get('/:studentId')
  async getStudentById(
    @Param('studentId') studentId: string,
  ): Promise<StudentDto | null> {
    return this.studentService.getStudentById(studentId);
  }

  @ApiOkResponse()
  @Delete('/:studentId')
  async softDeleteStudent(
    @Param('studentId') studentId: string,
  ): Promise<boolean> {
    await this.studentService.softDeleteStudent(studentId);
    return true;
  }

  @ApiOkResponse()
  @Patch('/restore/:studentId')
  async restoreStudent(
    @Param('studentId') studentId: string,
  ): Promise<boolean> {
    await this.studentService.restoreStudent(studentId);
    return true;
  }
}
