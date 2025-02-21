import { ApiProperty } from "@nestjs/swagger";
import { SubjectDetailDto } from "src/subject/dto/subject-details.dto";
import { UserDto } from "src/user/dto/user.dto";


export class TeacherDto extends UserDto{
  @ApiProperty()
  teacherId: string;

  @ApiProperty({ type: [SubjectDetailDto] })
  subjects: SubjectDetailDto[];

  @ApiProperty()
  classes: string[];
}

  