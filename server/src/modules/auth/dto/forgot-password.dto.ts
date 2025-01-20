import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ type: String, example: 'user@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
