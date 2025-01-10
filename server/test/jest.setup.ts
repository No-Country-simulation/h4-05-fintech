import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import { seeder } from '../seeder/seeder';

export let app: INestApplication;
export let validationPipe: ValidationPipe;

beforeAll(async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  await app.init();
  await seeder(app);
});

afterAll(async () => {
  await app.close();
});
