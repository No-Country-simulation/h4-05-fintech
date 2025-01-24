import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import { AuthService } from '../src/modules/auth/auth.service';

export let app: INestApplication;
export let validationPipe: ValidationPipe;
export let authService: AuthService;

beforeAll(async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  authService = app.get<AuthService>(AuthService);

  await app.init();
});

afterAll(async () => {
  await app.close();
});
