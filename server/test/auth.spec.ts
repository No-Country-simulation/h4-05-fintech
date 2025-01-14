import request from 'supertest';
import { app, validationPipe } from './jest.setup';
import { LoginDto, RegistryDto } from '../src/modules/auth/dto';
import { ErrorMessage } from '../src/common/enums';
import {
  expiredRefreshToken,
  invalidRefreshToken,
  normalUserRefreshToken,
} from '../prisma/seeds/user.seeds';

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
        email: 'newuser@email.com',
        password: 'newNormalUser123',
        confirmPassword: 'newNormalUser12',
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

        const { statusCode, header, body, error } = await request(app.getHttpServer())
          .post('/auth/registry')
          .send(result);

        console.log(error);
        expect(statusCode).toEqual(201);
        expect(header['content-type']).toContain('application/json');
        expect(body.message).toContain('user successfully registered');
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });

  describe('GET /auth/verify/:code', () => {
    it('Should not verify because the code format is not valid', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).get('/auth/verify/code');

      expect(statusCode).toEqual(406);
      expect(JSON.parse(error['text']).message).toContain('invalid 32-digit code');
    });

    it('Should not verify because user not found', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).get(
        '/auth/verify/cc9a156c065df8dcc4440e46489f544c02bb6464ff5a2fd9b67baba44ed528fe',
      );

      expect(statusCode).toEqual(404);
      expect(JSON.parse(error['text']).message).toContain('user not found');
    });

    it('Should successfully verify an user', async () => {
      const { statusCode, header, body } = await request(app.getHttpServer()).get(
        '/auth/verify/6c1f78b489714f4789816dfa97238b009cf0946ffdfeba6231b1f964f3c682d8',
      );

      expect(statusCode).toEqual(200);
      expect(header['content-type']).toContain('application/json');
      expect(body.message).toContain('user successfully verified');
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
        password: 'normalUser',
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

    it('should not login because unverified status', async () => {
      const data = {
        email: 'unverified2@email.com',
        password: 'unverifiedUser0',
      };

      try {
        const result = await validationPipe.transform(data, { type: 'body', metatype: LoginDto });
        const { statusCode, error } = await request(app.getHttpServer())
          .post('/auth/login')
          .send(result);

        expect(statusCode).toBe(403);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_NOT_VERIFIED);
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it(`Should not login because user already did it`, async () => {
      const { statusCode, error } = await request(app.getHttpServer())
        .post('/auth/login')
        .set('Cookie', `refresh-cookie=${normalUserRefreshToken}`);

      expect(statusCode).toEqual(400);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.LOGGED_IN);
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

        const { statusCode, header, body } = await request(app.getHttpServer())
          .post('/auth/login')
          .send(result);

        expect(statusCode).toEqual(200);
        expect(header['content-type']).toContain('application/json');
        expect(body.accessToken).toBeDefined();
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('should successfully login because invalid token', async () => {
      const data = {
        email: 'normal@email.com',
        password: 'normalUser1',
      };

      try {
        const result = await validationPipe.transform(data, { type: 'body', metatype: LoginDto });
        const { statusCode, header, body } = await request(app.getHttpServer())
          .post('/auth/login')
          .set('Api-Key', 'my-api-key')
          .set('Cookie', `refresh-cookie=${invalidRefreshToken}`)
          .send(result);

        expect(statusCode).toBe(200);
        expect(header['content-type']).toContain('application/json');
        expect(body.accessToken).toBeDefined();
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('should successfully login because expired token', async () => {
      const data = {
        email: 'normal@email.com',
        password: 'normalUser1',
      };

      try {
        const result = await validationPipe.transform(data, { type: 'body', metatype: LoginDto });
        const { statusCode, header, body } = await request(app.getHttpServer())
          .post('/auth/login')
          .set('Api-Key', 'my-api-key')
          .set('Cookie', `refresh-cookie=${expiredRefreshToken}`)
          .send(result);

        expect(statusCode).toBe(200);
        expect(header['content-type']).toContain('application/json');
        expect(body.accessToken).toBeDefined();
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });

  describe('GET /auth/logout', () => {
    it('Should not logout because not logged in', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).get('/auth/logout');

      expect(statusCode).toEqual(400);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NOT_LOGGED_IN);
    });

    it('should not logout because invalid jwt refresh', async () => {
      const { statusCode, error } = await request(app.getHttpServer())
        .get('/auth/logout')
        .set('Cookie', `refresh-cookie=${invalidRefreshToken}`);

      expect(statusCode).toBe(400);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NOT_LOGGED_IN);
    });

    it('should not logout because expired jwt refresh', async () => {
      const { statusCode, error } = await request(app.getHttpServer())
        .get('/auth/logout')
        .set('Cookie', `refresh-cookie=${expiredRefreshToken}`);

      expect(statusCode).toBe(400);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NOT_LOGGED_IN);
    });

    it('Should successfully logout', async () => {
      const { statusCode, header, body } = await request(app.getHttpServer())
        .get('/auth/logout')
        .set('Cookie', `refresh-cookie=${normalUserRefreshToken}`);

      expect(statusCode).toEqual(200);
      expect(header['content-type']).toContain('application/json');
      expect(body.message).toContain('successfully logged out');
    });
  });
});
