import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Gender } from "src/user/enums/gender.enum";

export class RegisterParentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstname: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
  
    @ApiProperty()
    @IsString()
    avatar?: string;

    @ApiProperty()
    @IsString()
    dob?: string;

    @ApiProperty({ enum: Gender })
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender; 
  
    @ApiProperty()
    @IsString()
    address?: string;
  
    @ApiProperty()
    @IsString()
    state?: string;
  
    @ApiProperty()
    @IsString()
    country?: string;

    @ApiProperty({ type: [String], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    studentIds?: string[];
  }
  