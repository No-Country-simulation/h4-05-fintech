import request from 'supertest';
import { app, validationPipe } from './jest.setup';
import { LoginDto, RegistryDto } from '../src/modules/auth/dto';
import { ErrorMessage } from 'src/common/enums';

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

    it(`Should not registry because the user already exists`, async () => {
      const data = {
        email: 'unverified@email.com',
        password: 'unverifiedUser0',
        confirmPassword: 'unverifiedUser0',
      };
      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: RegistryDto,
        });

        const { statusCode, error } = await request(app.getHttpServer())
          .post('/auth/registry')
          .send(result);
        expect(statusCode).toEqual(409);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.REGISTERED_USER);
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
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
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.PASSWORD_UNMATCH);
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it(`Should successfully registry an user`, async () => {
      const data = {
        email: 'newuser@email.com',
        password: 'newNormalUser123',
        confirmPassword: 'newNormalUser123',
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
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });

  describe('POST /auth/login', () => {
    it('Should not login because no data', async () => {
      try {
        await validationPipe.transform({}, { type: 'body', metatype: LoginDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not login because invalid data', async () => {
      const data = {
        email: 'user45',
        passwort: 'userjj',
      };
      try {
        await validationPipe.transform(data, { type: 'body', metatype: LoginDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it(`Should not login because user not found`, async () => {
      const data = {
        email: 'anon@email.com',
        password: 'anonUser1',
      };
      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: LoginDto,
        });

        const { statusCode, error } = await request(app.getHttpServer())
          .post('/auth/login')
          .send(result);
        expect(statusCode).toEqual(404);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_NOT_FOUND);
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it(`Should not login because invalid credentials`, async () => {
      const data = {
        email: 'normal@email.com',
        password: 'normalUser1',
      };
      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: LoginDto,
        });

        const { statusCode, error } = await request(app.getHttpServer())
          .post('/auth/login')
          .send(result);
        expect(statusCode).toEqual(401);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.INVALID_CREDENTIALS);
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it(`Should successfully login`, async () => {
      const data = {
        email: 'normal@email.com',
        password: 'normalUser1',
      };
      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: LoginDto,
        });

        const { statusCode, body } = await request(app.getHttpServer())
          .post('/auth/login')
          .send(result);
        expect(statusCode).toEqual(200);
        expect(body.accessToken).toBeDefined();
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });
});
