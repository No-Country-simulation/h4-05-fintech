import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { RegistryDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registry(data: RegistryDto) {
    const userFound = await this.userService.getUser(data.email);

    if (userFound) throw new ConflictException('User already registered!');

    const isMatch = data.password === data.confirmPassword;

    if (!isMatch) throw new BadRequestException(`the passwords don't maych`);

    const hashed = await bcrypt.hash(data.password, 10);

    // Implementar un proveedor de correos electrónicos

    await this.userService.createUser({ email: data.email, password: hashed });

    return { message: 'User successfully registered!' };
  }
}
