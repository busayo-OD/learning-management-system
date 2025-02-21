import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Gender } from "src/user/enums/gender.enum";

export class RegisterStudentDto {
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
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

    @ApiProperty()
    @IsNumber()
    classId: number;

    @ApiProperty()
    @IsString()
    classSectionId?: number;
}
