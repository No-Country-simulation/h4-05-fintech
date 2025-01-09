import { IsNotEmpty, IsEmail, Matches, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, {
    message:
      'password must have at least one uppercase letter, one lowercase letter, one number. Special character are not allowed',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
