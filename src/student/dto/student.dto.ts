import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/user/dto/user.dto";

export class StudentDto extends UserDto {

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  class: string;

  @ApiProperty()
  section: string;

  }