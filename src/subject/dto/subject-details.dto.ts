import { ApiProperty } from "@nestjs/swagger";

export class SubjectDetailDto {
  @ApiProperty()
  subject: string;

  @ApiProperty()
  class: string;

  @ApiProperty()
  section: string;
}
