import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class RegistryDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, {
    message:
      'password must have at least one uppercase letter, one lowercase letter, one number. Special character are not allowed',
  })
  password: string;
}
