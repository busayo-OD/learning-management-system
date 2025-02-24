import { Controller, Get, } from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CountService } from 'src/user/user.count.service';
import { CountDto } from 'src/user/dto/count.dto';

@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly countService: CountService
  ) {}

  @ApiOkResponse({ type: CountDto })
  @Get('/count')
  async getTotalStaff(): Promise<CountDto> {
    return this.countService.getTotalByRole('staff');
  }

}
