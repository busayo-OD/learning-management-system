import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { GetStudentDto } from './get-student.dto';

export class ParentDto extends UserDto {
  @ApiProperty()
  parentId: string;

  @ApiProperty({ type: [GetStudentDto] })
  students: GetStudentDto[];
}
