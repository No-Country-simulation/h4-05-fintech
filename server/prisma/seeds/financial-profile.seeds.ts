import crypto from 'node:crypto';
import { FinancialProfile } from '@prisma/client';
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
} from '../../src/modules/profile/enums';
import { adminUserProfile } from './user-profile.seeds';

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

export const financialProfileRandomData = (): FinancialProfile[] => {
  const randomData: FinancialProfile[] = [];
  for (let i = 0; i < 100; i++) {
    const index = (multiplier: number): number => {
      return Math.floor(Math.random() * multiplier);
    };

    const age = Math.floor(Math.random() * 80) + 18;

    const financialGoals = (): FinancialGoals => {
      let goal: FinancialGoals;
      switch (index(7)) {
        case 0:
          goal = FinancialGoals.IMPREVISTOS;
          break;
        case 1:
          goal = FinancialGoals.INGRESOS_ADICIONALES;
          break;
        case 2:
          goal = FinancialGoals.JUBILACION;
          break;
        case 3:
          goal = FinancialGoals.LIBERTAD_FINANCIERA;
          break;
        case 4:
          goal = FinancialGoals.PROYECTOS_LARGO_PLAZO;
          break;
        case 5:
          goal = FinancialGoals.VACACIONES;
          break;
        case 6:
          goal = FinancialGoals.VIVIENDA;
          break;
        case 7:
          goal = FinancialGoals.OTROS;
          break;
        default:
          break;
      }
      return goal;
    };

    const investmentKnowledge = (): InvestmentKnowledge => {
      let knowledge: InvestmentKnowledge;
      switch (index(4)) {
        case 0:
          knowledge = InvestmentKnowledge.NO_TENGO_IDEA;
          break;
        case 1:
          knowledge = InvestmentKnowledge.ME_SUENA_PERO;
          break;
        case 2:
          knowledge = InvestmentKnowledge.SE_COMO_FUNCIONA;
          break;
        case 3:
          knowledge = InvestmentKnowledge.INVIERTO_REGULARMENTE;
          break;
        default:
          break;
      }
      return knowledge;
    };

    const financialEducation = (): FinancialEducation => {
      let education: FinancialEducation;
      switch (index(4)) {
        case 0:
          education = FinancialEducation.NO_TENGO_FORMACION;
          break;
        case 1:
          education = FinancialEducation.CERTIFICADO_PROFESIONAL;
          break;
        case 2:
          education = FinancialEducation.TECNICO_O_TECNOLOGICO;
          break;
        case 3:
          education = FinancialEducation.CARRERA_PROFESIONAL;
          break;
        default:
          break;
      }
      return education;
    };

    const investmentExperience = (): InvestmentExperience => {
      let experience: InvestmentExperience;
      switch (index(4)) {
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

    const investmentTimeframes = (): InvestmentTimesframes => {
      let period: InvestmentTimesframes;
      switch (index(3)) {
        case 0:
          period = InvestmentTimesframes.CORTO;
          break;
        case 1:
          period = InvestmentTimesframes.MEDIANO;
          break;
        case 2:
          period = InvestmentTimesframes.LARGO;
          break;
        default:
          break;
      }
      return period;
    };

    const riskReaction = (): RiskReactions => {
      let reaction: RiskReactions;
      switch (index(3)) {
        case 0:
          reaction = RiskReactions.VENDERIA_TODO;
          break;
        case 1:
          reaction = RiskReactions.MANTENDRIA_INVERSION;
          break;
        case 2:
          reaction = RiskReactions.COMPRARIA_MAS;
          break;
        default:
          break;
      }
      return reaction;
    };

    const incomeSource = (): IncomeSources => {
      let source: IncomeSources;
      switch (index(4)) {
        case 0:
          source = IncomeSources.INDEPENDIENTE;
          break;
        case 1:
          source = IncomeSources.SALARIO;
          break;
        case 2:
          source = IncomeSources.AHORROS;
          break;
        case 3:
          source = IncomeSources.INVERSIONES;
          break;
        case 4:
          source = IncomeSources.JUBILACION;
          break;
        case 5:
          source = IncomeSources.HERENCIA;
          break;
        default:
          break;
      }
      return source;
    };

    const incomeRanges = (): IncomeRanges => {
      let income: IncomeRanges;
      switch (index(3)) {
        case 0:
          income = IncomeRanges.OPTION_ONE;
          break;
        case 1:
          income = IncomeRanges.OPTION_TWO;
          break;
        case 2:
          income = IncomeRanges.OPTION_THREE;
          break;
        default:
          break;
      }
      return income;
    };

    const expenseRatios = (): ExpensesRatios => {
      let ratios: ExpensesRatios;
      switch (index(3)) {
        case 0:
          ratios = ExpensesRatios.OPTION_ONE;
          break;
        case 1:
          ratios = ExpensesRatios.OPTION_TWO;
          break;
        case 2:
          ratios = ExpensesRatios.OPTION_THREE;
          break;
        default:
          break;
      }
      return ratios;
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

    const savingPlan = (): SavingPlans => {
      let plan: SavingPlans;
      switch (index(2)) {
        case 0:
          plan = SavingPlans.NO;
          break;
        case 1:
          plan = SavingPlans.YES;
          break;
        default:
          break;
      }
      return plan;
    };

    const savingsRanges = (): SavingsRanges => {
      let plan: SavingsRanges;
      switch (index(3)) {
        case 0:
          plan = SavingsRanges.OPTION_ONE;
          break;
        case 1:
          plan = SavingsRanges.OPTION_TWO;
          break;
        case 2:
          plan = SavingsRanges.OPTION_THREE;
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
      userProfileId: undefined,
      financialGoals: financialGoals(),
      investmentKnowledge: investmentKnowledge(),
      riskReactions: riskReaction(),
      investmentPurpose: investmentPurpose(),
      financialEducation: financialEducation(),
      investmentExperience: [investmentExperience()],
      investmentTimeframes: investmentTimeframes(),
      incomeSources: incomeSource(),
      incomeRanges: incomeRanges(),
      expenseRatios: expenseRatios(),
      age,
      occupation: occupation[index(occupation.length)],
      savingsPlans: savingPlan(),
      savingsRanges: savingsRanges(),
      // monthlyContribution: monthlyContribution(),
    };
    randomData.push(financialProfile);
  }
  return randomData;
};

const financialProfile: FinancialProfile = {
  id: crypto.randomUUID(),
  userProfileId: adminUserProfile.id,
  financialGoals: FinancialGoals.IMPREVISTOS,
  investmentKnowledge: InvestmentKnowledge.NO_TENGO_IDEA,
  financialEducation: FinancialEducation.NO_TENGO_FORMACION,
  investmentPurpose: InvestmentPurpose.AHORRO,
  riskReactions: RiskReactions.MANTENDRIA_INVERSION,
  investmentExperience: [InvestmentExperience.ACCIONES],
  investmentTimeframes: InvestmentTimesframes.LARGO,
  incomeSources: IncomeSources.INDEPENDIENTE,
  incomeRanges: IncomeRanges.OPTION_ONE,
  expenseRatios: ExpensesRatios.OPTION_ONE,
  age: 25,
  occupation: occupation[2],
  savingsPlans: SavingPlans.NO,
  savingsRanges: SavingsRanges.OPTION_TWO,
  // monthlyContribution: contributionArray[0],
};

export const financialProfileSeeds = [...financialProfileRandomData(), financialProfile];
