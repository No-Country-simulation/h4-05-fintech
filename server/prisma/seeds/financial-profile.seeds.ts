import crypto from 'node:crypto';
import {
  FinancialGoals,
  FinancialPreference,
  FinancialKnowledge,
  FinancialOptions,
  FinancialProfile,
  IncomeSource,
} from '@prisma/client';

enum TargetPeriod {
  THREE = '3',
  SIX = '6',
  TWELVE = '12',
  TWELVE_PLUS = '12+',
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

export const financialProfileRandomData = (): FinancialProfile[] => {
  const randomData: FinancialProfile[] = [];
  for (let i = 0; i < 100; i++) {
    const index = (multiplier: number): number => {
      return Math.floor(Math.random() * multiplier);
    };

    const age = Math.floor(Math.random() * 80) + 18;
    const incomeAverage = Math.floor(Math.random() * 900000) + 100000;
    const expensesAverage = Math.floor(Math.random() * 900000) + 100000;
    const monthlycontribution = Math.round(Math.random() * 100);

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

    const financial = (): {
      financialPreference: FinancialPreference;
      financialOptions: FinancialOptions;
    } => {
      let financialPreference: FinancialPreference;
      let financialOptions: FinancialOptions;
      switch (index(2)) {
        case 0:
          financialPreference = FinancialPreference.AHORRO;
          break;
        case 1:
          financialPreference = FinancialPreference.INVERSION;
          break;
        default:
          break;
      }
      if (financialPreference === FinancialPreference.INVERSION) {
        switch (index(6)) {
          case 0:
            financialOptions = FinancialOptions.ACCIONES;
            break;
          case 1:
            financialOptions = FinancialOptions.CDEARS;
            break;
          case 2:
            financialOptions = FinancialOptions.BONOS;
            break;
          case 3:
            financialOptions = FinancialOptions.CFD;
            break;
          case 4:
            financialOptions = FinancialOptions.ETFS;
            break;
          case 5:
            financialOptions = FinancialOptions.OTROS;
            break;
          default:
            break;
        }
      }
      return { financialPreference, financialOptions };
    };

    const targetPeriod = (): TargetPeriod => {
      let months: TargetPeriod;
      switch (index(4)) {
        case 0:
          months = TargetPeriod.THREE;
          break;
        case 1:
          months = TargetPeriod.SIX;
          break;
        case 2:
          months = TargetPeriod.TWELVE;
          break;
        case 3:
          months = TargetPeriod.TWELVE_PLUS;
          break;
        default:
          break;
      }
      return months;
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

    const { financialPreference, financialOptions } = financial();

    const financialProfile: FinancialProfile = {
      id: crypto.randomUUID(),
      userId: undefined,
      financialGoal: financialGoal(),
      financialPreference,
      financialKnowledge: financialKnowledge(),
      investmentPeriod: targetPeriod(),
      age,
      occupation: occupation[index(occupation.length)],
      financialOptions,
      incomeSource: incomeSource(),
      incomeAverage,
      expensesAverage,
      savingPlan: savingPlan(),
      planDescription: undefined,
      monthlycontribution,
    };
    randomData.push(financialProfile);
  }
  return randomData;
};

export const financialProfileSeeds = [...financialProfileRandomData()];
