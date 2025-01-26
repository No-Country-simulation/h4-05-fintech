import { Module, Global } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
