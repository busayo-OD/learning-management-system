import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { CountService } from 'src/user/user.count.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, User])],
  controllers: [ParentController],
  providers: [ParentService, CountService],
  exports: [ParentService, CountService]
})
export class ParentModule {}
