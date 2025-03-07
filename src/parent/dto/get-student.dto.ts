import { ApiProperty } from "@nestjs/swagger";

export class GetStudentDto {
  @ApiProperty()
  studentId: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;
}