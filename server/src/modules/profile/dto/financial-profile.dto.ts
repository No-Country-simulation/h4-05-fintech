import { IsNotEmpty, IsOptional, IsEnum, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
} from '../enums';

export class FinancialProfileDto {
  @ApiProperty({ enum: FinancialGoals, required: true })
  @IsNotEmpty()
  @IsEnum(FinancialGoals)
  financialGoals: FinancialGoals;

  @ApiProperty({ enum: InvestmentKnowledge, required: true })
  @IsNotEmpty()
  @IsEnum(InvestmentKnowledge)
  investmentKnowledge: InvestmentKnowledge;

  @ApiProperty({ enum: FinancialEducation, required: true })
  @IsNotEmpty()
  @IsEnum(FinancialEducation)
  financialEducation: FinancialEducation;

  @ApiProperty({ enum: InvestmentExperience, required: true })
  @IsNotEmpty()
  @IsEnum(InvestmentExperience)
  investmentExperience: InvestmentExperience[];

  @ApiProperty({ enum: RiskReactions, required: true })
  @IsNotEmpty()
  @IsEnum(RiskReactions)
  riskReactions: RiskReactions;

  @ApiProperty({ enum: InvestmentTimesframes, required: true })
  @IsNotEmpty()
  @IsEnum(InvestmentTimesframes)
  investmentTimeframes: InvestmentTimesframes;

  @ApiProperty({ enum: IncomeSources, required: true })
  @IsNotEmpty()
  @IsEnum(IncomeSources)
  incomeSources: IncomeSources;

  @ApiProperty({ enum: IncomeRanges, required: true })
  @IsNotEmpty()
  @IsEnum(IncomeRanges)
  incomeRanges: IncomeRanges;

  @ApiProperty({ enum: ExpensesRatios, required: true })
  @IsNotEmpty()
  @IsEnum(ExpensesRatios)
  expenseRatios: ExpensesRatios;

  @ApiProperty({ enum: InvestmentPurpose, required: false })
  @IsOptional()
  @IsEnum(InvestmentPurpose)
  investmentPurpose: InvestmentPurpose;

  @ApiProperty({ type: Number, example: 20, required: false })
  @IsOptional()
  @IsInt()
  age: number;

  @ApiProperty({ type: String, example: 'Estudiante', required: false })
  @IsOptional()
  @IsString()
  occupation: string;

  @ApiProperty({ enum: SavingPlans, required: false })
  @IsOptional()
  @IsEnum(SavingPlans)
  savingsPlans: SavingPlans;

  @ApiProperty({ enum: SavingsRanges, required: false })
  @IsOptional()
  @IsEnum(SavingPlans)
  savingsRanges: SavingsRanges;

  // @ApiProperty({ enum: MonthlyContribution })
  // @IsOptional()
  // @IsEnum(MonthlyContribution)
  // monthlyContribution: MonthlyContribution;
}
