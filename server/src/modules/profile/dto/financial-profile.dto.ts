import { IsNotEmpty, IsOptional, IsEnum, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import {
  ExpensesRatios,
  FinancialEducation,
  FinancialGoals,
  IncomeAverage,
  IncomeSource,
  InvestmentExperience,
  InvestmentKnowledge,
  InvestmentPurpose,
  InvestmentTimesframes,
  RiskReactions,
  SavingPlans,
  SavingsRanges,
  // MonthlyContribution,
} from '../enums';

export class FinancialProfileDto {
  @ApiProperty({ enum: FinancialGoals })
  @IsNotEmpty()
  @IsEnum(FinancialGoals)
  financialGoals: FinancialGoals;

  @ApiProperty({ enum: InvestmentKnowledge })
  @IsNotEmpty()
  @IsEnum(InvestmentKnowledge)
  investmentKnowledge: InvestmentKnowledge;

  @ApiProperty({ enum: FinancialEducation })
  @IsNotEmpty()
  @IsEnum(FinancialEducation)
  financialEducation: FinancialEducation;

  @ApiProperty({ enum: InvestmentExperience })
  @IsNotEmpty()
  @IsEnum(InvestmentExperience)
  investmentExperience: InvestmentExperience[];

  @ApiProperty({ enum: RiskReactions })
  @IsNotEmpty()
  @IsEnum(RiskReactions)
  riskReactions: RiskReactions;

  @ApiProperty({ enum: InvestmentTimesframes })
  @IsNotEmpty()
  @IsEnum(InvestmentTimesframes)
  investmentTimeframes: InvestmentTimesframes;

  @ApiProperty({ enum: IncomeSource })
  @IsNotEmpty()
  @IsEnum(IncomeSource)
  incomeSources: IncomeSource;

  @ApiProperty({ enum: IncomeAverage })
  @IsNotEmpty()
  @IsEnum(IncomeAverage)
  incomeRanges: IncomeAverage;

  @ApiProperty({ enum: ExpensesRatios })
  @IsNotEmpty()
  @IsEnum(ExpensesRatios)
  expensesRatios: ExpensesRatios;

  @ApiProperty({ enum: InvestmentPurpose })
  @IsOptional()
  @IsEnum(InvestmentPurpose)
  investmentPurpose: InvestmentPurpose;

  @ApiProperty({ type: Number, example: 20 })
  @IsOptional()
  @IsInt()
  age: number;

  @ApiProperty({ type: String, example: 'Estudiante' })
  @IsOptional()
  @IsString()
  occupation: string;

  @ApiProperty({ enum: SavingPlans })
  @IsOptional()
  @IsEnum(SavingPlans)
  savingsPlans: SavingPlans;

  @ApiProperty({ enum: SavingsRanges })
  @IsOptional()
  @IsEnum(SavingPlans)
  savingsRanges: SavingsRanges;

  // @ApiProperty({ enum: MonthlyContribution })
  // @IsOptional()
  // @IsEnum(MonthlyContribution)
  // monthlyContribution: MonthlyContribution;
}
