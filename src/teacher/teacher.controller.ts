import { Controller, Get, Param, UseGuards, } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './dto/list-teacher.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CountService } from 'src/user/user.count.service';
import { CountDto } from 'src/user/dto/count.dto';


@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly countService: CountService) {}

    @ApiOkResponse({ type: CountDto })
    @Get('/count')
    async getTotalTeachers(): Promise<CountDto> {
      return this.countService.getTotalByRole('teacher');
    }

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

  @ApiOkResponse({ type: TeacherDto })
  @Roles("admin")
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':teacherId')
  async getTeacherById(@Param('teacherId') teacherId: string): Promise<TeacherDto> {
    return this.teacherService.getTeacherByTeacherId(teacherId);
  }

}
