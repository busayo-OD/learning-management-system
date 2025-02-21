import { Controller, Get, } from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOkResponse({ type: Object })
  @Get('/count')
  async getTotalStaff(): Promise<{ total: number }> {
    return this.staffService.getTotalStaff();
  }

}
