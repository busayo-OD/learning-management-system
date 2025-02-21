import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';

export class UserDto {
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar?: string;
  
  @ApiProperty()
  dob?: string;
  
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiProperty()
  address: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  phoneNumber: string;
}
