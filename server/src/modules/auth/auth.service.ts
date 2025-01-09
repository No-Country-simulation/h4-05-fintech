import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { RegistryDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registry(data: RegistryDto) {
    const hashed = await bcrypt.hash(data.password, 10);
    console.log(data, hashed);
  }
}
