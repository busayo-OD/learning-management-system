import { Controller, Get, } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('parents')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @ApiOkResponse({ type: Object })
  @Get('/count')
  async getTotalStudents(): Promise<{ total: number }> {
    return this.parentService.getTotalParents();
  }
}
