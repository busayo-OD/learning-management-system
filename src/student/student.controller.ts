import { Controller, Get, } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CountDto } from 'src/user/dto/count.dto';
import { CountService } from 'src/user/user.count.service';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly countService: CountService
  ) {}

  @ApiOkResponse({ type: CountDto })
  @Get('/count')
  async getTotalStudents(): Promise<CountDto> {
    return this.countService.getTotalByRole('student');
  }

  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

}
