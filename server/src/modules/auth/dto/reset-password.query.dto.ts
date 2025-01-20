import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[a-f0-9]{64}$/i, {
    message: 'should be 32-digit hexadecimal code',
  })
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  exp: string;
}
