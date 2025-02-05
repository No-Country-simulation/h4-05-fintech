import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ type: String, example: 'user@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
