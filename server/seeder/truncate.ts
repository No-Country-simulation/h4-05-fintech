import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const truncate = async (app: INestApplication) => {
  await request(app.getHttpServer()).post('/truncate').send('user');
};
