import { IsOptional, IsString, MaxLength, Matches, IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    type: String,
    description: 'the name should not contain any number or special character',
    maxLength: 20,
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^[a-zA-Z]+$/, {
    message: 'the name should not contain any number or special character',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'the lastname should not contain any number or special character',
    maxLength: 20,
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^[a-zA-Z]+$/, {
    message: 'the lastname should not contain any number or special character',
  })
  lastname: string;

  @ApiProperty({
    type: Number,
    maxLength: 20,
    example: 18,
    required: false,
  })
  @IsOptional()
  @IsInt()
  age: number;

  @ApiProperty({
    type: String,
    maxLength: 20,
    example: 'Arquitecto',
    required: false,
  })
  @IsOptional()
  @IsString()
  occupation: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'file must be an image jpeg, png, or gif',
    required: false,
  })
  @IsOptional()
  image: Express.Multer.File;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  itemsSaved: string[];
}
