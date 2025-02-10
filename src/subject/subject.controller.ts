import { Body, Controller, Get, Post, UseGuards, } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { AssignSubjectDto } from './dto/assign-subject.dto';
import { SubjectDto } from './dto/list-subject.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOkResponse({
    type: Boolean,
  })
  @Roles("admin")
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.createSubject(createSubjectDto);
  }

  @ApiOkResponse({
    type: Boolean,
  })
  @Roles("admin")
  @UseGuards(JwtGuard, RolesGuard)
  @Post('assign')
  async assignSubject(@Body() assignSubjectDto: AssignSubjectDto): Promise<boolean> {
    return this.subjectService.assignSubject(assignSubjectDto);
  }

  @ApiOkResponse({
    type: SubjectDto,
    isArray: true,
  })
  @Get()
  async getAllSubjects(): Promise<SubjectDto[]> {
    return this.subjectService.getAllSubjects();
  }
}
