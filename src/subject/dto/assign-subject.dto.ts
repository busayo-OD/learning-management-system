import { ApiProperty } from "@nestjs/swagger";

export class AssignSubjectDto {
    @ApiProperty()
    subjectCode: string;

    @ApiProperty()
    teacherId: string;

    @ApiProperty()
    classId: number;

    @ApiProperty()
    classSectionId: number;
  }
