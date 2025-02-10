import { Controller, Get, UseGuards, } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './dto/list-teacher.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOkResponse({
    type: TeacherDto,
    isArray: true,
  })
  @Roles("admin")
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  async getTeachers(): Promise<TeacherDto[]> {
    return this.teacherService.getAllTeachers();
  }
}
