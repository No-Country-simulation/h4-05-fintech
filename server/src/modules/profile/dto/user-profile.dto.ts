import { IsOptional, IsString, MaxLength, Matches, IsArray } from 'class-validator';
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
