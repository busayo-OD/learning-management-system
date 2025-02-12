import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subjectCode?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subjectName?: string;

  @IsOptional()
  @IsString()
  description?: string;
}