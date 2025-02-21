import { Controller, Get, } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOkResponse({ type: Object })
  @Get('/count')
  async getTotalStudents(): Promise<{ total: number }> {
    return this.studentService.getTotalStudents();
  }

  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

}
