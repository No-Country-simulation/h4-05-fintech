import { IsNotEmpty, IsEmail, Matches, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistryDto {
  @ApiProperty({ type: String, example: 'user@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description:
      'password must have at least one uppercase letter, one lowercase letter, one number. Special character are not allowed',
    minLength: 8,
    maxLength: 30,
    example: 'User12345',
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, {
    message:
      'password must have at least one uppercase letter, one lowercase letter, one number. Special character are not allowed',
  })
  password: string;

  @ApiProperty({ type: String, example: 'User12345' })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
