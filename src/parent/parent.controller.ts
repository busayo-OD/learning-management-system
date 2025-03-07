import { Controller, Get, Delete, Param, Patch } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CountService } from 'src/user/user.count.service';
import { CountDto } from 'src/user/dto/count.dto';
import { ParentDto } from './dto/parent.dto';

@Controller('parents')
export class ParentController {
  constructor(
    private readonly parentService: ParentService,
    private readonly countService: CountService
  ) {}

  @ApiOkResponse({ type: CountDto })
  @Get('/count')
  async getTotalParents(): Promise<CountDto> {
    return this.countService.getTotalByRole('parent');
  }

  @ApiOkResponse({ type: [ParentDto] })
  @Get()
  async getAllParents(): Promise<ParentDto[]> {
    return this.parentService.getAllParents();
  }

  @ApiOkResponse({ type: ParentDto })
  @Get('/:parentId')
  async getParentById(@Param('parentId') parentId: string): Promise<ParentDto | null> {
    return this.parentService.getParentById(parentId);
  }

  @ApiOkResponse()
  @Delete('/:parentId')
  async softDeleteParent(@Param('parentId') parentId: string): Promise<boolean> {
    return this.parentService.softDeleteParent(parentId);
  }

  @ApiOkResponse()
  @Patch('/restore/:parentId')
  async restoreParent(@Param('parentId') parentId: string): Promise<boolean> {
    return this.parentService.restoreParent(parentId);
  }
}

