import { ApiProperty } from "@nestjs/swagger";

class SubjectDetailDto {
  @ApiProperty()
  subject: string;

  @ApiProperty()
  class: string;

  @ApiProperty()
  section: string;
}

export class TeacherDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  teacherId: string;

  @ApiProperty({ type: [SubjectDetailDto] })
  subjects: SubjectDetailDto[];

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  address: string;
}

  