import { IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  itemsSaved: string[];
}
