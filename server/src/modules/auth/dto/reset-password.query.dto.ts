import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordQueryDto {
  @ApiProperty({
    type: String,
    pattern: '/^[a-f0-9]{64}$/i',
    example: '6c1f78b489714f4789816dfa97238b009cf0946ffdfeba6231b1f964f3c682d8',
  })
  @IsNotEmpty()
  @Matches(/^[a-f0-9]{64}$/i, {
    message: 'should be 32-digit hexadecimal code',
  })
  code: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  exp: string;
}
