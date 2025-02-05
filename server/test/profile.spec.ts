import request from 'supertest';
import { app, validationPipe } from './jest.setup';
import { ErrorMessage } from '../src/common/enums';
import { FinancialProfileDto, UpdateProfileDto } from '../src/modules/profile/dto';
import {
  ExpensesRatios,
  FinancialEducation,
  FinancialGoals,
  IncomeRanges,
  IncomeSources,
  InvestmentExperience,
  InvestmentKnowledge,
  InvestmentPurpose,
  InvestmentTimesframes,
  RiskReactions,
  SavingPlans,
  SavingsRanges,
  // MonthlyContribution,
} from '../src/modules/profile/enums/financial-profile.enum';
import { adminUserToken, normalUserToken, unknownUserToken } from '../prisma/seeds/user.seeds';
import { normalUserProfile } from '../prisma/seeds/user-profile.seeds';

describe('Profile', () => {
  describe('POST /profile/financial', () => {
    it('Should not access to the endpoint', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).post('/profile/financial');

      expect(statusCode).toEqual(401);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NO_ACCESS);
    });

    it('Should not create profile because no data', async () => {
      try {
        await validationPipe.transform({}, { type: 'body', metatype: FinancialProfileDto });
        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not create profile because invalid data', async () => {
      const data = {
        financialGoal: 'EDUCACIO',
        financialKnowledg: 'BASICO',
        investmentEducatio: 'NADA',
        investmentExperience: 'NADA',
        riskCase: 'MODERADO',
        targetPeriod: 'MEDIANO',
        incomesource: 'INDEPENDIENTE',
        incomeAverage: IncomeRanges.OPTION_ONE,
        expensesAverage: ExpensesRatios.OPTION_ONE,
        investmentPurpos: 'NINGUNO',
        age: undefined,
        occupation: 'Programador',
        savingPlan: false,
        // monthlyContribution: MonthlyContribution.OPTION_TWO,
      };

      try {
        await validationPipe.transform(data, {
          type: 'body',
          metatype: FinancialProfileDto,
        });

        fail('Validation pipe should throw an error for invalid data');
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
      }
    });

    it('Should not create financial profile because user not found', async () => {
      const data: FinancialProfileDto = {
        financialGoals: FinancialGoals.VIVIENDA,
        investmentKnowledge: InvestmentKnowledge.ME_SUENA_PERO,
        riskReactions: RiskReactions.MANTENDRIA_INVERSION,
        financialEducation: FinancialEducation.CARRERA_PROFESIONAL,
        investmentExperience: [InvestmentExperience.BONOS, InvestmentExperience.CDEARS],
        investmentPurpose: InvestmentPurpose.AHORRO,
        investmentTimeframes: InvestmentTimesframes.CORTO,
        incomeSources: IncomeSources.AHORROS,
        incomeRanges: IncomeRanges.OPTION_ONE,
        expenseRatios: ExpensesRatios.OPTION_TWO,
        age: undefined,
        occupation: 'Programador',
        savingsPlans: SavingPlans.NO,
        savingsRanges: SavingsRanges.OPTION_THREE,
        // monthlyContribution: MonthlyContribution.OPTION_TWO,
      };

      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: FinancialProfileDto,
        });

        const { statusCode, error } = await request(app.getHttpServer())
          .post('/profile/financial')
          .auth(unknownUserToken, { type: 'bearer' })
          .send(result);

        expect(statusCode).toEqual(404);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_PROFILE_NOT_FOUND);
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('Should not create financial profile because already did it', async () => {
      const data: FinancialProfileDto = {
        financialGoals: FinancialGoals.VIVIENDA,
        investmentKnowledge: InvestmentKnowledge.ME_SUENA_PERO,
        riskReactions: RiskReactions.MANTENDRIA_INVERSION,
        financialEducation: FinancialEducation.CARRERA_PROFESIONAL,
        investmentExperience: [InvestmentExperience.BONOS, InvestmentExperience.CDEARS],
        investmentPurpose: InvestmentPurpose.AHORRO,
        investmentTimeframes: InvestmentTimesframes.CORTO,
        incomeSources: IncomeSources.AHORROS,
        incomeRanges: IncomeRanges.OPTION_ONE,
        expenseRatios: ExpensesRatios.OPTION_TWO,
        age: undefined,
        occupation: 'Programador',
        savingsPlans: SavingPlans.NO,
        savingsRanges: SavingsRanges.OPTION_THREE,
        // monthlyContribution: MonthlyContribution.OPTION_TWO,
      };

      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: FinancialProfileDto,
        });

        const { statusCode, error } = await request(app.getHttpServer())
          .post('/profile/financial')
          .auth(adminUserToken, { type: 'bearer' })
          .send(result);

        expect(statusCode).toEqual(409);
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.PROFILE_CREATED);
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('Should successfully create financial profile', async () => {
      const data: FinancialProfileDto = {
        financialGoals: FinancialGoals.VIVIENDA,
        investmentKnowledge: InvestmentKnowledge.ME_SUENA_PERO,
        riskReactions: RiskReactions.MANTENDRIA_INVERSION,
        financialEducation: FinancialEducation.CARRERA_PROFESIONAL,
        investmentExperience: [InvestmentExperience.BONOS, InvestmentExperience.CDEARS],
        investmentPurpose: InvestmentPurpose.AHORRO,
        investmentTimeframes: InvestmentTimesframes.CORTO,
        incomeSources: IncomeSources.AHORROS,
        incomeRanges: IncomeRanges.OPTION_ONE,
        expenseRatios: ExpensesRatios.OPTION_TWO,
        age: undefined,
        occupation: 'Programador',
        savingsPlans: SavingPlans.NO,
        savingsRanges: SavingsRanges.OPTION_THREE,
        // monthlyContribution: MonthlyContribution.OPTION_TWO,
      };

      try {
        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: FinancialProfileDto,
        });

        const { statusCode, header, body } = await request(app.getHttpServer())
          .post('/profile/financial')
          .auth(normalUserToken, { type: 'bearer' })
          .send(result);

        expect(statusCode).toEqual(201);
        expect(header['content-type']).toContain('application/json');
        expect(body.message).toContain('financial profile successfully created');
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });

  describe('GET /profile/data', () => {
    it('Should not access to the endpoint', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).get('/profile/data');

      expect(statusCode).toEqual(401);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NO_ACCESS);
    });

    it('Should not get profile data because user not found', async () => {
      const { statusCode, error } = await request(app.getHttpServer())
        .get('/profile/data')
        .auth(unknownUserToken, { type: 'bearer' });

      expect(statusCode).toEqual(404);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_PROFILE_NOT_FOUND);
    });

    it('Should get user profile', async () => {
      const { statusCode, header, body } = await request(app.getHttpServer())
        .get('/profile/data')
        .auth(normalUserToken, { type: 'bearer' });

      expect(statusCode).toEqual(200);
      expect(header['content-type']).toContain('application/json');
      expect(body.id).toContain(normalUserProfile.id);
      expect(body.name).toContain(normalUserProfile.name);
      expect(body.lastname).toContain(normalUserProfile.lastname);
      expect(body.image).toContain(normalUserProfile.image);
      expect(body.surveyAnswered).toBe(true);
      expect(body.financialProfileResults).toBe(normalUserProfile.financialProfileResults);
      expect(body.itemsSaved).toBeInstanceOf(Array);
    });
  });

  describe('PUT /profile/data', () => {
    it('Should not access to the endpoint', async () => {
      const { statusCode, error } = await request(app.getHttpServer()).put('/profile/data');

      expect(statusCode).toEqual(401);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.NO_ACCESS);
    });

    it('Should not update profile data because user not found', async () => {
      const { statusCode, error } = await request(app.getHttpServer())
        .put('/profile/data')
        .auth(unknownUserToken, { type: 'bearer' });

      expect(statusCode).toEqual(404);
      expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_PROFILE_NOT_FOUND);
    });

    it('Should not update profile because unsupported file format ', async () => {
      try {
        const fakeFile = {
          fieldname: 'image',
          originalname: 'document.pdf',
          mimetype: 'application/pdf',
          size: 1204,
          buffer: Buffer.from('image'),
        };

        const { statusCode, header } = await request(app.getHttpServer())
          .put('/profile/data')
          .auth(normalUserToken, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .attach(fakeFile.fieldname, fakeFile.buffer, fakeFile.originalname);

        expect(statusCode).toEqual(415);
        expect(header['content-type']).toContain('application/json');
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('Should update user profile without any image', async () => {
      try {
        const data = {
          name: 'John',
          lastname: 'Doe',
          itemsSaved: ['news', 'postcasts', 'url'],
        };

        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: UpdateProfileDto,
        });

        const { statusCode, header, body } = await request(app.getHttpServer())
          .put('/profile/data')
          .auth(normalUserToken, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .field({ ...result });

        expect(statusCode).toEqual(200);
        expect(header['content-type']).toContain('application/json');
        expect(body.message).toContain('User profile successfully updated');
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('Should update only the profile image', async () => {
      try {
        const fakeFile = {
          fieldname: 'image',
          originalname: 'image.jpeg',
          mimetype: 'image/jpeg',
          size: 1204,
          buffer: Buffer.from('image'),
        };

        const { statusCode, header, body } = await request(app.getHttpServer())
          .put('/profile/data')
          .auth(normalUserToken, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .attach(fakeFile.fieldname, fakeFile.buffer, fakeFile.originalname);

        expect(statusCode).toEqual(200);
        expect(header['content-type']).toContain('application/json');
        expect(body.message).toContain('User profile successfully updated');
      } catch (error) {
        console.log(error);
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('Should update user profile with image included', async () => {
      try {
        const data = {
          name: 'John',
          lastname: 'Doe',
          itemsSaved: ['news', 'postcasts', 'url'],
        };

        const fakeFile = {
          fieldname: 'image',
          originalname: 'image.jpeg',
          mimetype: 'image/jpeg',
          size: 1204,
          buffer: Buffer.from('image'),
        };

        const result = await validationPipe.transform(data, {
          type: 'body',
          metatype: UpdateProfileDto,
        });

        const { statusCode, header, body } = await request(app.getHttpServer())
          .put('/profile/data')
          .auth(normalUserToken, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .field({ ...result })
          .attach(fakeFile.fieldname, fakeFile.buffer, fakeFile.originalname);

        expect(statusCode).toEqual(200);
        expect(header['content-type']).toContain('application/json');
        expect(body.message).toContain('User profile successfully updated');
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });
});
