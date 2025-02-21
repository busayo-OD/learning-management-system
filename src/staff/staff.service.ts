import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
          @InjectRepository(Staff)
          private staffRepository: Repository<Staff>,
        ) {}
      async saveStaff(staff: Staff): Promise<Staff> {
        return this.staffRepository.save(staff);
      }

      async getLastStaff(): Promise<Staff | null> {
        return await this.staffRepository
          .createQueryBuilder('staff')
          .orderBy('staff.id', 'DESC')
          .getOne();
      }

      async getTotalStaff(): Promise<{ total: number }> {
        const count = await this.staffRepository.count();
        return { total: count };
      }
}
