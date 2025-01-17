import { IsNotEmpty, IsOptional, IsEnum, IsInt, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  FinancialGoals,
  FinancialKnowledge,
  InvestmentEducation,
  InvestmentExperience,
  InvestmentPurpose,
  IncomeSource,
  RiskCase,
} from '@prisma/client';
import {
  ExpensesAverage,
  IncomeAverage,
  // MonthlyContribution,
  TargetPeriod,
} from '../profile.enum';

export class FinancialProfileDto {
  @ApiProperty({ enum: FinancialGoals })
  @IsNotEmpty()
  @IsEnum(FinancialGoals)
  financialGoal: FinancialGoals;

  @ApiProperty({ enum: FinancialKnowledge })
  @IsNotEmpty()
  @IsEnum(FinancialKnowledge)
  financialKnowledge: FinancialKnowledge;

  @ApiProperty({ enum: RiskCase })
  @IsNotEmpty()
  @IsEnum(RiskCase)
  riskCase: RiskCase;

  @ApiProperty({ enum: InvestmentEducation })
  @IsNotEmpty()
  @IsEnum(InvestmentEducation)
  investmentEducation: InvestmentEducation;

  @ApiProperty({ enum: InvestmentExperience })
  @IsNotEmpty()
  @IsEnum(InvestmentExperience)
  investmentExperience: InvestmentExperience;

  @ApiProperty({ enum: InvestmentPurpose })
  @IsNotEmpty()
  @IsEnum(InvestmentPurpose)
  investmentPurpose: InvestmentPurpose;

  @ApiProperty({ enum: TargetPeriod })
  @IsNotEmpty()
  @IsEnum(TargetPeriod)
  targetPeriod: TargetPeriod;

  @ApiProperty({ enum: IncomeSource })
  @IsNotEmpty()
  @IsEnum(IncomeSource)
  incomeSource: IncomeSource;

  @ApiProperty({ enum: IncomeAverage })
  @IsNotEmpty()
  @IsEnum(IncomeAverage)
  incomeAverage: IncomeAverage;

  @ApiProperty({ enum: ExpensesAverage })
  @IsNotEmpty()
  @IsEnum(ExpensesAverage)
  expensesAverage: ExpensesAverage;

  @ApiProperty({ type: Number, example: 20 })
  @IsOptional()
  @IsInt()
  age: number;

  @ApiProperty({ type: String, example: 'Estudiante' })
  @IsOptional()
  @IsString()
  occupation: string;

  @ApiProperty({ type: Boolean, example: false })
  @IsOptional()
  @IsBoolean()
  savingPlan: boolean;

  @ApiProperty({ type: String, example: 'Sin plan de ahorro' })
  @IsOptional()
  @IsString()
  planDescription: string;

  // @ApiProperty({ enum: MonthlyContribution })
  // @IsOptional()
  // @IsEnum(MonthlyContribution)
  // monthlyContribution: MonthlyContribution;
}
