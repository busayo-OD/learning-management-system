import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Gender } from "src/user/enums/gender.enum";

export class RegisterAdminDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber?: string;
  avatar?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  dob?: string;
  
  @ApiProperty({ enum: Gender })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
  
  address?: string;
  state?: string;
  country?: string;
}

