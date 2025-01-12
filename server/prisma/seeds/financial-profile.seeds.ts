import crypto from 'node:crypto';
import {
  FinancialGoals,
  FinancialKnowledge,
  FinancialOptions,
  FinancialProfile,
} from '@prisma/client';

export const financialProfileRandomData = (): FinancialProfile[] => {
  const randomData: FinancialProfile[] = [];
  for (let i = 0; i < 100; i++) {
    const randomDays = Math.floor(Math.random() * 500);
    const targetPeriod = new Date(new Date().getTime() + randomDays * 24 * 60 * 60 * 1000);
    const index = (multiplier: number): number => {
      return Math.floor(Math.random() * multiplier);
    };

    const financialKnowledge = (): FinancialKnowledge => {
      let knowledge: FinancialKnowledge;
      switch (index(4)) {
        case 0:
          knowledge = FinancialKnowledge.BASICO;
          break;
        case 1:
          knowledge = FinancialKnowledge.INTERMEDIO;
          break;
        case 2:
          knowledge = FinancialKnowledge.AVANZADO;
          break;
        case 3:
          knowledge = FinancialKnowledge.NINGUNO;
          break;
        default:
          break;
      }
      return knowledge;
    };

    const financialGoal = (): FinancialGoals => {
      let goal: FinancialGoals;
      switch (index(7)) {
        case 0:
          goal = FinancialGoals.JUBILACION;
          break;
        case 1:
          goal = FinancialGoals.VACACIONES;
          break;
        case 2:
          goal = FinancialGoals.IMPREVISTOS;
          break;
        case 3:
          goal = FinancialGoals.VIVIENDA;
          break;
        case 4:
          goal = FinancialGoals.EDUCACION;
          break;
        case 5:
          goal = FinancialGoals.LIBERTAD_FINANCIERA;
          break;
        case 6:
          goal = FinancialGoals.OTROS;
          break;
        default:
          break;
      }
      return goal;
    };

    const financialOptions = (): FinancialOptions => {
      let option: FinancialOptions;
      switch (index(6)) {
        case 0:
          option = FinancialOptions.ACCIONES;
          break;
        case 1:
          option = FinancialOptions.CDEARS;
          break;
        case 2:
          option = FinancialOptions.BONOS;
          break;
        case 3:
          option = FinancialOptions.CFD;
          break;
        case 4:
          option = FinancialOptions.ETFS;
          break;
        case 5:
          option = FinancialOptions.OTROS;
          break;
        default:
          break;
      }
      return option;
    };

    const financialProfile: FinancialProfile = {
      id: crypto.randomUUID(),
      userId: undefined,
      financialGoal: financialGoal(),
      financialKnowledge: financialKnowledge(),
      financialOptions: financialOptions(),
      targetPeriod,
      age: undefined,
      occupation: undefined,
      preference: undefined,
      incomeSource: undefined,
      incomeAverage: undefined,
      expensesAverage: undefined,
      savingPlan: undefined,
      planDescription: undefined,
      contribution: undefined,
    };
    randomData.push(financialProfile);
  }
  return randomData;
};

export const financialProfileSeeds = [...financialProfileRandomData()];
