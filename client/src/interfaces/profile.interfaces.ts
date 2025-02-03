export interface IProfileData {
  name: string | null;
  lastname: string | null;
  age: number | null
  occupation: string | null
  image: string | null;
  surveyAnswered: boolean;
  itemsSaved: string[];
  profile: string | null;
  recommendations: string[] | null;
  tips: string[] | null;
};

export interface IUpdateProfileData {
  name: string;
  lastname: string;
  image: string ;
  age: number
  occupation: string
  itemsSaved: string[];
};

export interface IFinancialSurvey {      
  financialGoals: FinancialGoals;
  investmentKnowledge: InvestmentKnowledge;
  financialEducation: FinancialEducation;
  investmentExperience: InvestmentExperience[]
  riskReactions: RiskReactions;
  investmentTimeframes: InvestmentTimesframes;
  incomeSources: IncomeSources;
  incomeRanges: IncomeRanges;
  expenseRatios: ExpensesRatios;
  investmentPurpose: InvestmentPurpose | null
  savingsPlans: SavingPlans | null
  savingsRanges: SavingsRanges | null
}

export enum IncomeRanges {
  OPTION_ONE = 'Menos de 279718',
  OPTION_TWO = 'Entre 280000 y 1400000',
  OPTION_THREE = 'Mas de 1400000',
}

export enum ExpensesRatios {
  OPTION_ONE = 'Menos del 30% de tus ingresos',
  OPTION_TWO = 'Entre 30% y 60% de tus ingresos',
  OPTION_THREE = 'Mas del 60% de tus ingresos',
}

export enum InvestmentTimesframes {
  CORTO = 'Corto plazo',
  MEDIANO = 'Mediano plazo',
  LARGO = 'Largo plazo',
}

export enum FinancialGoals {
  JUBILACION = 'Jubilacion',
  VACACIONES = 'Vacaciones',
  IMPREVISTOS = 'Imprevistos',
  VIVIENDA = 'Compra de vivienda',
  LIBERTAD_FINANCIERA = 'Libertad financiera',
  PROYECTOS_LARGO_PLAZO = 'Proyectos a largo plazo',
  INGRESOS_ADICIONALES = 'Ingresos adicionales',
  OTROS = 'Otros',
}

export enum InvestmentKnowledge {
  NO_TENGO_IDEA = 'No tengo idea',
  ME_SUENA_PERO = 'Me suena pero no estoy seguro',
  SE_COMO_FUNCIONA = 'Se como funcionan',
  INVIERTO_REGULARMENTE = 'Invierto de forma regular',
}

export enum FinancialEducation {
  CERTIFICADO_PROFESIONAL = 'Certificado profesional',
  TECNICO_O_TECNOLOGICO = 'Tecnico o tecnologo',
  CARRERA_PROFESIONAL = 'Carrera profesional',
  NO_TENGO_FORMACION = 'No tengo formación',
}

export enum InvestmentExperience {
  ACCIONES = 'Acciones',
  CDEARS = 'Cedears',
  BONOS = 'Bonos',
  ETFS = 'ETFs',
}

export enum RiskReactions {
  VENDERIA_TODO = 'Venderia todo',
  MANTENDRIA_INVERSION = 'Mantendria la inversion',
  COMPRARIA_MAS = 'Compraria mas',
}

export enum IncomeSources {
  SALARIO = 'Salario',
  INDEPENDIENTE = 'Independiente',
  INVERSIONES = 'Inversiones',
  AHORROS = 'Ahorros',
  JUBILACION = 'Jubilacion',
  HERENCIA = 'Herencia',
}

export enum SavingPlans {
  YES = 'Si',
  NO = 'No',
}

export enum SavingsRanges {
  OPTION_ONE = 'Entre 0% y 30%',
  OPTION_TWO = 'Entre 30% y 60%',
  OPTION_THREE = 'Mas del 60%',
}

export enum InvestmentPurpose {
  AHORRO = 'Ahorro',
  INVERSION = 'Inversion',
  AMBOS = 'A'
}