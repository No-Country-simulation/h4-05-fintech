import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { userSeeds } from './user.seed';

export const seeder = async (app: INestApplication) => {
  await request(app.getHttpServer()).post('/seeder').send({ seeds: userSeeds, modelName: 'user' });
};
