import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateSubjectDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subjectCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subjectName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}