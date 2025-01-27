import crypto from 'node:crypto';
import request from 'supertest';

import { app, validationPipe, credentialsService } from './jest.setup';
import {
  ChangePasswordDto,
  SendEmailDto,
  LoginDto,
  RegistryDto,
  ResetPasswordDto,
} from '../src/modules/auth/dto';
import { ErrorMessage } from '../src/common/enums';
import {
  codeForVerification1,
  expiredCodeForPasswordReset,
  expiredRefreshToken,
  invalidCodeForPasswordReset,
  invalidCodeForVerification,
  invalidRefreshToken,
  normalUser,
  normalUserRefreshToken,
  normalUserToken,
  userNotFoundForPasswordReset,
  userNotFoundForVerification,
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

        const { statusCode, header, body } = await request(app.getHttpServer())
          .post('/auth/registry')
          .send(result);

        expect(statusCode).toEqual(201);
        expect(header['content-type']).toContain('application/json');
        expect(body.message).toContain('user successfully registered');
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });

  describe('GET /auth/verify?code=code', () => {
    it('Should not verify because the code format is not valid', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).get(
        `/auth/verify?code=${invalidCodeForVerification}`,
      );

      expect(statusCode).toEqual(406);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.INVALID_CODE);
    });

    it('Should not verify because user not found', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).get(
        `/auth/verify?code=${userNotFoundForVerification}`,
      );

      expect(statusCode).toEqual(404);
      expect(JSON.parse(error['text']).message).toContain('user not found');
    });

    it('Should successfully verify an user', async () => {
      const { statusCode, header, body } = await request(app.getHttpServer()).get(
        `/auth/verify?code=${codeForVerification1}`,
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

    it('should block user because attempts number exceeded', async () => {
      const data = {
        email: 'usertoblock@email.com',
        password: 'normalUser10',
      };

      try {
        const result = await validationPipe.transform(data, { type: 'body', metatype: LoginDto });
        const { statusCode, error } = await request(app.getHttpServer())
          .post('/auth/login')
          .send(result);

        expect(statusCode).toBe(403);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_BLOCKED);
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('should not login because the user is blocked', async () => {
      const data = {
        email: 'blockeduser@email.com',
        password: 'normalUser1',
      };

      try {
        const result = await validationPipe.transform(data, { type: 'body', metatype: LoginDto });
        const { statusCode, error } = await request(app.getHttpServer())
          .post('/auth/login')
          .send(result);

        expect(statusCode).toBe(403);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_BLOCKED);
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

        const { accessToken } = body;
        const { id } = await credentialsService.verifyAccessToken(accessToken);

        expect(statusCode).toEqual(200);
        expect(header['content-type']).toContain('application/json');
        expect(id).toEqual(normalUser.id);
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

        const { accessToken } = body;
        const { id } = await credentialsService.verifyAccessToken(accessToken);

        expect(statusCode).toEqual(200);
        expect(header['content-type']).toContain('application/json');
        expect(id).toEqual(normalUser.id);
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

        const { accessToken } = body;
        const { id } = await credentialsService.verifyAccessToken(accessToken);

        expect(statusCode).toEqual(200);
        expect(header['content-type']).toContain('application/json');
        expect(id).toEqual(normalUser.id);
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });

  describe('GET /auth/refresh', () => {
    it('Should not refresh because not logged in', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).get('/auth/refresh');

      expect(statusCode).toEqual(400);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NOT_LOGGED_IN);
    });

    it('Should not refresh because invalid token', async () => {
      const { statusCode, error } = await request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Cookie', `refresh-cookie=${invalidRefreshToken}`);

      expect(statusCode).toEqual(400);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NOT_LOGGED_IN);
    });

    it('Should not refresh because expired token', async () => {
      const { statusCode, error } = await request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Cookie', `refresh-cookie=${expiredRefreshToken}`);

      expect(statusCode).toEqual(400);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NOT_LOGGED_IN);
    });

    it('Should successfully refresh', async () => {
      const { statusCode, header, body } = await request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Cookie', `refresh-cookie=${normalUserRefreshToken}`);

      const { accessToken } = body;
      const { id } = await credentialsService.verifyAccessToken(accessToken);

      expect(statusCode).toEqual(200);
      expect(header['content-type']).toContain('application/json');
      expect(id).toEqual(normalUser.id);
    });
  });

  describe('PUT /auth/password-change', () => {
    it('Should not access to the endpoint', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).put('/auth/password-change');

      expect(statusCode).toEqual(401);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NO_ACCESS);
    });

    it('Should not change password because no data', async () => {
      try {
        await validationPipe.transform({}, { type: 'body', metatype: ChangePasswordDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not change password because invalid data', async () => {
      const data = {
        curentPassword: 'user1023',
        neuPasswort: 'user1024',
      };

      try {
        await validationPipe.transform(data, { type: 'body', metatype: ChangePasswordDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not change password because the old one and the new are equal', async () => {
      const data = {
        currentPassword: 'normalUser1',
        newPassword: 'normalUser1',
      };

      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: ChangePasswordDto,
        });

        const { statusCode, error } = await request(app.getHttpServer())
          .put('/auth/password-change')
          .auth(normalUserToken, { type: 'bearer' })
          .send(result);

        expect(statusCode).toEqual(409);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.EQUAL_PASSWORDS);
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should successfully change the password', async () => {
      const data = {
        currentPassword: 'normalUser1',
        newPassword: 'normalUser2',
      };

      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: ChangePasswordDto,
        });

        const { statusCode, body } = await request(app.getHttpServer())
          .put('/auth/password-change')
          .auth(normalUserToken, { type: 'bearer' })
          .send(result);

        expect(statusCode).toEqual(200);
        expect(body.message).toContain('password successfully changed');
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });

  describe('POST /forgot-password', () => {
    it('Should not initilize recovery because no data', async () => {
      try {
        await validationPipe.transform({}, { type: 'body', metatype: SendEmailDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not initilize recovery because invalid data', async () => {
      const data = { emai: 'juanito' };
      try {
        await validationPipe.transform(data, { type: 'body', metatype: SendEmailDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not initilize recovery because user not found', async () => {
      const data = { email: 'noone@email.com' };
      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: SendEmailDto,
        });

        const { statusCode, error } = await request(app.getHttpServer())
          .post('/auth/forgot-password')
          .send(result);

        expect(statusCode).toEqual(404);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_NOT_FOUND);
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('Should initilize recovery', async () => {
      const data = { email: 'normal@email.com' };
      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: SendEmailDto,
        });

        const { statusCode, body } = await request(app.getHttpServer())
          .post('/auth/forgot-password')
          .send(result);

        expect(statusCode).toEqual(200);
        expect(body.message).toContain('password recovery process initialized');
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });

  describe('PUT /password-reset?code=code&exp=2025', () => {
    it('Should not reset password because no data', async () => {
      try {
        await validationPipe.transform({}, { type: 'body', metatype: ResetPasswordDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not reset password because invalid data', async () => {
      const data = { neuPasswort: 'juanito', confirmPasword: 'juanito' };
      try {
        await validationPipe.transform(data, { type: 'body', metatype: ResetPasswordDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not reset password because invalid code', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).put(
        `/auth/password-reset?code=${invalidCodeForPasswordReset}`,
      );

      expect(statusCode).toEqual(406);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.INVALID_CODE);
    });

    it('Should not reset password because user not found', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).put(
        `/auth/password-reset?code=${userNotFoundForPasswordReset}`,
      );

      expect(statusCode).toEqual(404);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_NOT_FOUND);
    });

    it('Should not reset password because time expired', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).put(
        `/auth/password-reset?code=${expiredCodeForPasswordReset}`,
      );

      expect(statusCode).toEqual(401);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.EXPIRED_TIME);
    });

    it('Should successfully reset password', async () => {
      const encryptKey = Buffer.from(
        'd109cd4b5dea3329a60cd9b495b6d6a42cb2623cf7a406625481799c0afbe19e',
        'hex',
      );
      const iv = crypto.randomBytes(16);

      const expiration = new Date();
      const exp = expiration.setMinutes(expiration.getMinutes() + 15).toString();
      const query = {
        code: '45cf303dff2954150f614cb744f3e093a6e1d0a083366928880a08c6caeeb5cd',
        exp,
      };

      const text = Object.values(query).join(';');

      const cipher = crypto.createCipheriv('aes-256-cbc', encryptKey, iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      const encryptedData = {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex'),
      };

      const code = Object.values(encryptedData).join('.');

      const data = { newPassword: 'normalUser123', confirmPassword: 'normalUser123' };

      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: ResetPasswordDto,
        });

        const { statusCode, body } = await request(app.getHttpServer())
          .put(`/auth/password-reset?code=${code}`)
          .send(result);

        expect(statusCode).toEqual(200);
        expect(body.message).toContain('password successfully reset');
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
