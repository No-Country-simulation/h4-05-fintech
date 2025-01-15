import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String, example: 'user@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'User12345' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
