import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

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
    address?: string;
  
    @ApiProperty()
    @IsString()
    state?: string;
  
    @ApiProperty()
    @IsString()
    country?: string;
  }
  