/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,effectiveFrom]` on the table `SalaryRevision` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SalaryRevision_employeeId_effectiveFrom_idx";

-- AlterTable
ALTER TABLE "EmployeeDocument" ADD COLUMN "documentName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SalaryRevision_employeeId_effectiveFrom_key" ON "SalaryRevision"("employeeId", "effectiveFrom");
