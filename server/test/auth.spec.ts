import request from 'supertest';
import { app, validationPipe } from './jest.setup';
import { RegistryDto } from '../src/modules/auth/dto';

describe('Auth', () => {
  describe('POST /auth/registry', () => {
    it('Should not registry because no data', async () => {
      try {
        await validationPipe.transform({}, { type: 'body', metatype: RegistryDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not registry because invalid data', async () => {
      const data = {
        email: 'user45',
        passwort: 'userjj',
        confirmPassword: 'userjj',
      };
      try {
        await validationPipe.transform(data, { type: 'body', metatype: RegistryDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it(`Should not registry because the password don't match`, async () => {
      const data = {
        email: 'normal@email.com',
        password: 'normalUser123',
        confirmPassword: 'normalUser12',
      };
      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: RegistryDto,
        });

        const { statusCode, error } = await request(app.getHttpServer())
          .post('/auth/registry')
          .send(result);
        expect(statusCode).toEqual(400);
        expect(JSON.parse(error['text']).message).toContain(`the passwords don't match`);
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it(`Should successfully registry an user`, async () => {
      const data = {
        email: 'normal@email.com',
        password: 'normalUser123',
        confirmPassword: 'normalUser123',
      };
      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: RegistryDto,
        });

        const { statusCode, body } = await request(app.getHttpServer())
          .post('/auth/registry')
          .send(result);
        expect(statusCode).toEqual(201);
        expect(body.message).toContain('user successfully registered');
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });
});
