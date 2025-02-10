import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDto {

    @ApiProperty()
    subjectCode: string;

    @ApiProperty()
    subjectName: string;

    @ApiProperty()
    description?: string;
  }
