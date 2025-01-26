import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import { CredentialsService } from 'src/common/modules/cookies/credentials.service';

export let app: INestApplication;
export let validationPipe: ValidationPipe;
export let credentialsService: CredentialsService;

beforeAll(async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  credentialsService = app.get<CredentialsService>(CredentialsService);

  await app.init();
});

afterAll(async () => {
  await app.close();
});
