import crypto from 'node:crypto';
import {
  FinancialGoals,
  FinancialKnowledge,
  InvestmentPurpose,
  InvestmentEducation,
  InvestmentExperience,
  FinancialProfile,
  IncomeSource,
  RiskCase,
} from '@prisma/client';
import { adminUser } from './user.seeds';

enum TargetPeriod {
  CORTO = 'Menos de 1 año',
  MEDIANO = 'De 1 a 3 años',
  LARGO = 'Más 3 de años',
}

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

const incomeArray: string[] = ['-279718', '280000-1400000', '+14000000'];
const expensesArray: string[] = ['-30%', '30%-60%', '+60%'];
// const contributionArray: string[] = ['-10%', '10%-20%', '+20%'];

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
          knowledge = FinancialKnowledge.NO_TENGO_IDEA;
          break;
        case 1:
          knowledge = FinancialKnowledge.ME_SUENA_PERO_NO_ESTOY_SEGURO;
          break;
        case 2:
          knowledge = FinancialKnowledge.SE_COMO_FUNCIONA;
          break;
        case 3:
          knowledge = FinancialKnowledge.INVIERTO_REGULARMENTE;
          break;
        default:
          break;
      }
      return knowledge;
    };

    const investmentEducation = (): InvestmentEducation => {
      let education: InvestmentEducation;
      switch (index(6)) {
        case 0:
          education = InvestmentEducation.NO_TENGO_FORMACION;
          break;
        case 1:
          education = InvestmentEducation.CERTIFICADO_PROFESIONAL;
          break;
        case 2:
          education = InvestmentEducation.TECNICO_O_TECNOLOGICO;
          break;
        case 3:
          education = InvestmentEducation.CARRERA_PROFESIONAL;
          break;
        default:
          break;
      }
      return education;
    };

    const investmentExperience = (): InvestmentExperience => {
      let experience: InvestmentExperience;
      switch (index(6)) {
        case 0:
          experience = InvestmentExperience.ACCIONES;
          break;
        case 1:
          experience = InvestmentExperience.CDEARS;
          break;
        case 2:
          experience = InvestmentExperience.BONOS;
          break;
        case 3:
          experience = InvestmentExperience.ETFS;
          break;
        default:
          break;
      }
      return experience;
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

    const riskCase = (): RiskCase => {
      let riskCase: RiskCase;
      switch (index(3)) {
        case 0:
          riskCase = RiskCase.VENDERIA_TODO;
          break;
        case 1:
          riskCase = RiskCase.MANTENDRIA_INVERSION;
          break;
        case 2:
          riskCase = RiskCase.COMPRARIA_MAS;
          break;
        default:
          break;
      }
      return riskCase;
    };

    const incomeSource = (): IncomeSource => {
      let source: IncomeSource;
      switch (index(4)) {
        case 0:
          source = IncomeSource.INDEPENDIENTE;
          break;
        case 1:
          source = IncomeSource.SALARIO;
          break;
        case 2:
          source = IncomeSource.AHORROS;
          break;
        case 3:
          source = IncomeSource.INVERSIONES;
          break;
        case 4:
          source = IncomeSource.JUBILACION;
          break;
        case 5:
          source = IncomeSource.HERENCIA;
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

    // const monthlyContribution = (): string => {
    //   let contribution: string;
    //   switch (index(contributionArray.length)) {
    //     case 0:
    //       contribution = contributionArray[0];
    //       break;
    //     case 1:
    //       contribution = contributionArray[1];
    //       break;
    //     case 2:
    //       contribution = contributionArray[2];
    //       break;
    //     default:
    //       break;
    //   }
    //   return contribution;
    // };

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

    const investmentPurpose = (): InvestmentPurpose => {
      let purpose: InvestmentPurpose;
      switch (index(4)) {
        case 0:
          purpose = InvestmentPurpose.AHORRO;
          break;
        case 1:
          purpose = InvestmentPurpose.INVERSION;
          break;
        case 2:
          purpose = InvestmentPurpose.AMBOS;
          break;
        default:
          break;
      }
      return purpose;
    };

    const financialProfile: FinancialProfile = {
      id: crypto.randomUUID(),
      userId: undefined,
      financialGoal: financialGoal(),
      financialKnowledge: financialKnowledge(),
      riskCase: riskCase(),
      investmentPurpose: investmentPurpose(),
      investmentEducation: investmentEducation(),
      investmentExperience: investmentExperience(),
      targetPeriod: targetPeriod(),
      incomeSource: incomeSource(),
      incomeAverage: incomeAverage(),
      expensesAverage: expensesAverage(),
      age,
      occupation: occupation[index(occupation.length)],
      savingPlan: savingPlan(),
      // monthlyContribution: monthlyContribution(),
    };
    randomData.push(financialProfile);
  }
  return randomData;
};

const financialProfile1: FinancialProfile = {
  id: crypto.randomUUID(),
  userId: adminUser.id,
  financialGoal: FinancialGoals.EDUCACION,
  financialKnowledge: FinancialKnowledge.NO_TENGO_IDEA,
  investmentEducation: InvestmentEducation.NO_TENGO_FORMACION,
  investmentPurpose: InvestmentPurpose.AHORRO,
  riskCase: RiskCase.MANTENDRIA_INVERSION,
  investmentExperience: InvestmentExperience.ACCIONES,
  targetPeriod: TargetPeriod.LARGO,
  incomeSource: IncomeSource.INDEPENDIENTE,
  incomeAverage: incomeArray[1],
  expensesAverage: expensesArray[0],
  age: 25,
  occupation: occupation[2],
  savingPlan: false,
  // monthlyContribution: contributionArray[0],
};

export const financialProfileSeeds = [...financialProfileRandomData(), financialProfile1];
