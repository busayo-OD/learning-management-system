import { ApiProperty } from "@nestjs/swagger";

export class SubjectDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    subjectCode: string;

    @ApiProperty()
    subjectName: string;

    @ApiProperty()
    description: string;
  }
  