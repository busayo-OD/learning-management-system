import { Injectable } from '@nestjs/common';
import { Parent } from './entities/parent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParentDto } from './dto/parent.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
  ) {}

  async saveParent(parent: Parent): Promise<Parent> {
    return this.parentRepository.save(parent);
  }

  async getLastParent(): Promise<Parent | null> {
          return await this.parentRepository
            .createQueryBuilder('parent')
            .orderBy('parent.id', 'DESC')
            .getOne();
        }

  async getTotalParents(): Promise<{ total: number }> {
    const count = await this.parentRepository.count();
    return { total: count };
  }

  async getAllParents(): Promise<ParentDto[]> {
    const parents = await this.parentRepository.find({
      relations: ['user', 'students', 'students.user'],
      where: { deletedAt: null }, // Exclude soft-deleted records
    });

    return parents.map((parent) => ({
      firstname: parent.user.firstname,
      lastname: parent.user.lastname,
      email: parent.user.email,
      avatar: parent.user.avatar,
      gender: parent.user.gender,
      dob: parent.user.dob,
      address: parent.user.address,
      state: parent.user.state,
      country: parent.user.country,
      phoneNumber: parent.user.phoneNumber,
      parentId: parent.parentId,
      students: parent.students.map((student) => ({
        studentId: student.studentId,
        firstname: student.user.firstname,
        lastname: student.user.lastname,
      })),
    }));
  }

  async getParentById(parentId: string): Promise<ParentDto | null> {
    const parent = await this.parentRepository.findOne({
      where: { parentId: parentId, deletedAt: null },
      relations: ['user', 'students', 'students.user'],
    });

    if (!parent) return null;

    return {
      firstname: parent.user.firstname,
      lastname: parent.user.lastname,
      email: parent.user.email,
      avatar: parent.user.avatar,
      gender: parent.user.gender,
      dob: parent.user.dob,
      address: parent.user.address,
      state: parent.user.state,
      country: parent.user.country,
      phoneNumber: parent.user.phoneNumber,
      parentId: parent.parentId,
      students: parent.students.map((student) => ({
        studentId: student.studentId,
        firstname: student.user.firstname,
        lastname: student.user.lastname,
      })),
    };
  }

  async softDeleteParent(parentId: string): Promise<boolean> {
    const parent = await this.parentRepository.findOne({
      where: { parentId },
      relations: ['user'],
    });

    if (!parent) {
      throw new Error('Parent not found');
    }

    // Soft delete the parent record
    await this.parentRepository.softRemove(parent);

    // Soft delete the user record if they only have the 'parent' role
    if (
      parent.user.roles.length === 1 &&
      parent.user.roles[0].title === 'parent'
    ) {
      await this.parentRepository.manager
        .getRepository(User)
        .softRemove(parent.user);
    }

    return true;
  }

  async restoreParent(parentId: string): Promise<boolean> {
    const parent = await this.parentRepository.findOne({
      where: { parentId },
      relations: ['user'],
      withDeleted: true, // Include soft-deleted records
    });

    if (!parent) {
      throw new Error('Parent not found');
    }

    // Restore the parent record
    await this.parentRepository.recover(parent);

    // Restore the user record if they were soft deleted
    if (parent.user) {
      await this.parentRepository.manager
        .getRepository(User)
        .recover(parent.user);
    }

    return true;
  }
}
