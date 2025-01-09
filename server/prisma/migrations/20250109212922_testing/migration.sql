/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FinancialGoals" AS ENUM ('JUBILACION', 'VACACIONES', 'IMPREVISTOS', 'VIVIENDA', 'EDUCACION', 'LIBERTAD_FINANCIERA', 'OTROS');

-- CreateEnum
CREATE TYPE "FinancialKnowledge" AS ENUM ('BASICO', 'INTERMEDIO', 'AVANZADO', 'NINGUNO');

-- CreateEnum
CREATE TYPE "RiskTolerance" AS ENUM ('CONSERVADOR', 'MODERADO', 'ARRIESGADO');

-- CreateEnum
CREATE TYPE "FinancialPreference" AS ENUM ('AHORRO', 'INVERSION');

-- CreateEnum
CREATE TYPE "FinancialOptions" AS ENUM ('ACCIONES', 'CDEARS', 'BONOS', 'CFD', 'ETFS', 'OTROS');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profile_created" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "financial_goal" "FinancialGoals" NOT NULL,
    "financial_knowledge" "FinancialKnowledge" NOT NULL,
    "risk_tolerance" "RiskTolerance" NOT NULL,
    "age" INTEGER,
    "occupation" TEXT,
    "preference" "FinancialPreference",
    "financial_options" "FinancialOptions" NOT NULL,
    "income_source" TEXT,
    "income_average" INTEGER,
    "expenses_average" INTEGER,
    "saving_plan" BOOLEAN,
    "plan_description" TEXT,
    "contribution" INTEGER,
    "target_period" TIMESTAMP(3),

    CONSTRAINT "FinancialProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "income" INTEGER NOT NULL DEFAULT 0,
    "expenses" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FinancialData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_user_id_key" ON "Auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialProfile_user_id_key" ON "FinancialProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialData_user_id_key" ON "FinancialData"("user_id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialProfile" ADD CONSTRAINT "FinancialProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialData" ADD CONSTRAINT "FinancialData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
