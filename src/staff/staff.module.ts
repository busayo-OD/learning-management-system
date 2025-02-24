import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { Staff } from './entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountService } from 'src/user/user.count.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, User])],
  controllers: [StaffController],
  providers: [StaffService, CountService],
  exports: [StaffService, CountService]
})
export class StaffModule {}
