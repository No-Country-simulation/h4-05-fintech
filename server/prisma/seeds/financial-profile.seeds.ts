import crypto from 'node:crypto';
import {
  FinancialGoals,
  FinancialKnowledge,
  FinancialOptions,
  FinancialProfile,
  IncomeSource,
  TargetPeriod,
  RiskTolerance,
} from '@prisma/client';
import { normalUser } from './user.seeds';

const occupation = [
  'Controlador de tráfico aéreo',
  'Filósofos',
  'Desconocido',
  'Agrónomo',
  'Policía',
  'Psicólogos',
  'Modelos de moda',
  'Fotógrafo',
  'Bibliotecario',
  'Economista',
  'Matemático',
  'Cocinero',
  'Asistente veterinario',
  'Ingeniero químico',
  'Veterinario',
  'Ingeniero de telecomunicaciones',
  'Mozos y taberneros',
  'Músico',
  'Directores general',
  'Catador',
  'Cartógrafos y agrimensores',
  'Agente de bolsa',
  'Agente de viaje',
  'Operador de máquina',
  'Actor',
  'Piloto',
  'Agente inmobiliario',
  'Operadores de equipos ópticos y electrónicos',
  'Bombero',
  'Conductor',
  'Ingeniero electricista',
  'Conserje',
  'Contador',
  'Fisioterapeuta',
  'Farmacéutico',
  'Ingeniero mecánico',
  'Físicos',
  'Ingenieros de minas',
  'Ingeniero civil',
  'Coreógrafo',
  'Agente de seguros',
  'Gerentes de empresas',
  'Arquitecto',
  'Chapistas y caldereros',
  'Operador',
  'Dentista',
  'Sociólogos',
  'Profesionales del trabajo social',
  'Escritor',
  'Estadístico',
  'Programador informático',
  'Agentes comerciales y corredores',
  'Locutores de radio y televisión y afines',
  'Estudiante',
  'Geólogo',
  'Biólogo',
  'Técnicos en seguridad aeronáutica',
  'Agentes público',
  'Personal doméstico',
  'Mecánico',
  'Creadores y analistas de sistemas informáticos',
  'Químico',
  'Agricultor',
  'Abogado',
  'Técnico',
  'Recepcionista',
  'Compositor',
  'Médico',
  'Soldador',
  'Farmacólogos',
  'Profesor',
  'Operadores de equipos de radiodifusión',
  'Odontólogo',
  'Diseñador de interiores',
  'Secretaria',
];

const incomeArray: string[] = ['-200000', '200000-500000', '+500000'];
const expensesArray: string[] = ['-30%', '30%-60%', '+60%'];
const contributionArray: string[] = ['-10%', '10%-20%', '+20%'];

export const financialProfileRandomData = (): FinancialProfile[] => {
  const randomData: FinancialProfile[] = [];
  for (let i = 0; i < 100; i++) {
    const index = (multiplier: number): number => {
      return Math.floor(Math.random() * multiplier);
    };

    const age = Math.floor(Math.random() * 80) + 18;

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

    const targetPeriod = (): TargetPeriod => {
      let period: TargetPeriod;
      switch (index(3)) {
        case 0:
          period = TargetPeriod.CORTO;
          break;
        case 1:
          period = TargetPeriod.MEDIANO;
          break;
        case 2:
          period = TargetPeriod.LARGO;
          break;
        default:
          break;
      }
      return period;
    };

    const riskTolerance = (): RiskTolerance => {
      let tolerance: RiskTolerance;
      switch (index(3)) {
        case 0:
          tolerance = RiskTolerance.CONSERVADOR;
          break;
        case 1:
          tolerance = RiskTolerance.MODERADO;
          break;
        case 2:
          tolerance = RiskTolerance.ARRIESGADO;
          break;
        default:
          break;
      }
      return tolerance;
    };

    const incomeSource = (): IncomeSource => {
      let source: IncomeSource;
      switch (index(4)) {
        case 0:
          source = IncomeSource.INDEPENDIENTE;
          break;
        case 1:
          source = IncomeSource.DEPENDIENTE;
          break;
        case 2:
          source = IncomeSource.AMBOS;
          break;
        case 3:
          source = IncomeSource.JUBILACION;
          break;
        default:
          break;
      }
      return source;
    };

    const incomeAverage = (): string => {
      let income: string;
      switch (index(incomeArray.length)) {
        case 0:
          income = incomeArray[0];
          break;
        case 1:
          income = incomeArray[1];
          break;
        case 2:
          income = incomeArray[2];
          break;
        default:
          break;
      }
      return income;
    };

    const expensesAverage = (): string => {
      let expenses: string;
      switch (index(expensesArray.length)) {
        case 0:
          expenses = expensesArray[0];
          break;
        case 1:
          expenses = expensesArray[1];
          break;
        case 2:
          expenses = expensesArray[2];
          break;
        default:
          break;
      }
      return expenses;
    };

    const monthlyContribution = (): string => {
      let contribution: string;
      switch (index(contributionArray.length)) {
        case 0:
          contribution = contributionArray[0];
          break;
        case 1:
          contribution = contributionArray[1];
          break;
        case 2:
          contribution = contributionArray[2];
          break;
        default:
          break;
      }
      return contribution;
    };

    const savingPlan = (): boolean => {
      let plan: boolean;
      switch (index(2)) {
        case 0:
          plan = false;
          break;
        case 1:
          plan = true;
          break;
        default:
          break;
      }
      return plan;
    };

    const financialProfile: FinancialProfile = {
      id: crypto.randomUUID(),
      userId: undefined,
      financialGoal: financialGoal(),
      financialKnowledge: financialKnowledge(),
      riskTolerance: riskTolerance(),
      financialOptions: financialOptions(),
      targetPeriod: targetPeriod(),
      incomeSource: incomeSource(),
      incomeAverage: incomeAverage(),
      expensesAverage: expensesAverage(),
      age,
      occupation: occupation[index(occupation.length)],
      savingPlan: savingPlan(),
      planDescription: undefined,
      monthlycontribution: monthlyContribution(),
    };
    randomData.push(financialProfile);
  }
  return randomData;
};

const financialProfile1: FinancialProfile = {
  id: crypto.randomUUID(),
  userId: normalUser.id,
  financialGoal: FinancialGoals.EDUCACION,
  financialKnowledge: FinancialKnowledge.BASICO,
  riskTolerance: RiskTolerance.MODERADO,
  financialOptions: FinancialOptions.ACCIONES,
  targetPeriod: TargetPeriod.LARGO,
  incomeSource: IncomeSource.INDEPENDIENTE,
  incomeAverage: incomeArray[1],
  expensesAverage: expensesArray[0],
  age: 25,
  occupation: occupation[2],
  savingPlan: false,
  planDescription: undefined,
  monthlycontribution: contributionArray[0],
};

export const financialProfileSeeds = [...financialProfileRandomData(), financialProfile1];
