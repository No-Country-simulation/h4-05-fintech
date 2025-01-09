import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistryDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registry')
  async registry(@Body() data: RegistryDto) {
    await this.authService.registry(data);
  }
}
