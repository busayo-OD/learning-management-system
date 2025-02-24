import { Controller, Get, } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CountService } from 'src/user/user.count.service';
import { CountDto } from 'src/user/dto/count.dto';

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
}
