import request from 'supertest';
import { app, validationPipe } from './jest.setup';
import { ErrorMessage } from '../src/common/enums';
import { FinancialProfileDto } from '../src/modules/profile/dto';
import {
  ExpensesAverage,
  IncomeAverage,
  MonthlyContribution,
} from '../src/modules/profile/profile.enum';
import { adminUserToken, normalUserToken, unknownUserToken } from '../prisma/seeds/user.seeds';

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
        riskTolerance: 'MODERADO',
        financialOptions: 'OTROS',
        targetPeriod: 'MEDIANO',
        incomesource: 'INDEPENDIENTE',
        incomeAverage: IncomeAverage.OPTION_ONE,
        expensesAverage: ExpensesAverage.OPTION_ONE,
        age: undefined,
        occupation: 'Programador',
        savingPlan: false,
        planDescription: undefined,
        monthlyContribution: MonthlyContribution.OPTION_TWO,
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
        financialGoal: 'EDUCACION',
        financialKnowledge: 'BASICO',
        riskTolerance: 'MODERADO',
        financialOptions: 'OTROS',
        targetPeriod: 'CORTO',
        incomeSource: 'INDEPENDIENTE',
        incomeAverage: IncomeAverage.OPTION_ONE,
        expensesAverage: ExpensesAverage.OPTION_ONE,
        age: undefined,
        occupation: 'Programador',
        savingPlan: false,
        planDescription: undefined,
        monthlyContribution: MonthlyContribution.OPTION_TWO,
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
        expect(JSON.parse(error['text']).message).toContain(ErrorMessage.USER_NOT_FOUND);
      } catch (error) {
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('Should not create financial profile because already did it', async () => {
      const data: FinancialProfileDto = {
        financialGoal: 'EDUCACION',
        financialKnowledge: 'BASICO',
        riskTolerance: 'MODERADO',
        financialOptions: 'OTROS',
        targetPeriod: 'CORTO',
        incomeSource: 'INDEPENDIENTE',
        incomeAverage: IncomeAverage.OPTION_ONE,
        expensesAverage: ExpensesAverage.OPTION_ONE,
        age: undefined,
        occupation: 'Programador',
        savingPlan: false,
        planDescription: undefined,
        monthlyContribution: MonthlyContribution.OPTION_TWO,
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
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });

    it('Should successfully create financial profile', async () => {
      const data: FinancialProfileDto = {
        financialGoal: 'EDUCACION',
        financialKnowledge: 'BASICO',
        riskTolerance: 'MODERADO',
        financialOptions: 'OTROS',
        targetPeriod: 'CORTO',
        incomeSource: 'INDEPENDIENTE',
        incomeAverage: IncomeAverage.OPTION_ONE,
        expensesAverage: ExpensesAverage.OPTION_ONE,
        age: undefined,
        occupation: 'Programador',
        savingPlan: false,
        planDescription: undefined,
        monthlyContribution: MonthlyContribution.OPTION_TWO,
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
        fail(`Validation should not throw an error for valid data: ${error}`);
      }
    });
  });
});
