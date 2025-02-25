export interface ICreateProfile {
  name: string;
  lastname: string;
  image: string;
}

export interface SendProfileToModel {
  objetivo_financiero: string;
  horizonte_tiempo: string;
  conocimiento_inversiones: string;
  formacion: string;
  instrumentos_invertidos: string[];
  reaccion_perdida: string;
  fuente_ingresos: string;
  ingresos_mensuales: string;
  gastos_mensuales: string;
}

export interface RecommendationTypes {
  tipo: string;
  assets: string[];
}

export interface FinancialProfileResults {
  perfil_riesgo: string;
  recomendaciones: RecommendationTypes[];
  tips_ahorro_inversion: string[];
}
