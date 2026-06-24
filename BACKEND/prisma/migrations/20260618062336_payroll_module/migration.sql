/*
  Warnings:

  - Added the required column `totalDeductions` to the `EmployeePayroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalEarnings` to the `EmployeePayroll` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmployeePayroll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payrollRunId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "salaryRevisionId" INTEGER,
    "workingDays" INTEGER NOT NULL,
    "presentDays" REAL NOT NULL,
    "absentDays" REAL NOT NULL DEFAULT 0,
    "leaveDays" REAL NOT NULL DEFAULT 0,
    "holidayDays" REAL NOT NULL DEFAULT 0,
    "overtimeHours" REAL NOT NULL DEFAULT 0,
    "basicSalary" REAL NOT NULL,
    "hra" REAL NOT NULL,
    "da" REAL NOT NULL,
    "grossSalary" REAL NOT NULL,
    "pfAmount" REAL NOT NULL DEFAULT 0,
    "ptAmount" REAL NOT NULL DEFAULT 0,
    "esicAmount" REAL NOT NULL DEFAULT 0,
    "advanceDeduction" REAL NOT NULL DEFAULT 0,
    "totalDeductions" REAL NOT NULL,
    "totalEarnings" REAL NOT NULL,
    "netSalary" REAL NOT NULL,
    "salarySlipPath" TEXT,
    "paidDate" DATETIME,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmployeePayroll_payrollRunId_fkey" FOREIGN KEY ("payrollRunId") REFERENCES "PayrollRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EmployeePayroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EmployeePayroll_salaryRevisionId_fkey" FOREIGN KEY ("salaryRevisionId") REFERENCES "SalaryRevision" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EmployeePayroll" ("advanceDeduction", "basicSalary", "createdAt", "da", "employeeId", "esicAmount", "grossSalary", "hra", "id", "netSalary", "overtimeHours", "paidDate", "payrollRunId", "pfAmount", "presentDays", "ptAmount", "remarks", "updatedAt", "workingDays") SELECT "advanceDeduction", "basicSalary", "createdAt", "da", "employeeId", "esicAmount", "grossSalary", "hra", "id", "netSalary", "overtimeHours", "paidDate", "payrollRunId", "pfAmount", "presentDays", "ptAmount", "remarks", "updatedAt", "workingDays" FROM "EmployeePayroll";
DROP TABLE "EmployeePayroll";
ALTER TABLE "new_EmployeePayroll" RENAME TO "EmployeePayroll";
CREATE INDEX "EmployeePayroll_employeeId_idx" ON "EmployeePayroll"("employeeId");
CREATE INDEX "EmployeePayroll_payrollRunId_idx" ON "EmployeePayroll"("payrollRunId");
CREATE UNIQUE INDEX "EmployeePayroll_payrollRunId_employeeId_key" ON "EmployeePayroll"("payrollRunId", "employeeId");
CREATE TABLE "new_PayrollRun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "processedAt" DATETIME,
    "finalizedAt" DATETIME,
    "finalizedById" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PayrollRun_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PayrollRun_finalizedById_fkey" FOREIGN KEY ("finalizedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PayrollRun" ("companyId", "createdAt", "id", "month", "processedAt", "status", "updatedAt", "year") SELECT "companyId", "createdAt", "id", "month", "processedAt", "status", "updatedAt", "year" FROM "PayrollRun";
DROP TABLE "PayrollRun";
ALTER TABLE "new_PayrollRun" RENAME TO "PayrollRun";
CREATE INDEX "PayrollRun_companyId_idx" ON "PayrollRun"("companyId");
CREATE INDEX "PayrollRun_status_idx" ON "PayrollRun"("status");
CREATE UNIQUE INDEX "PayrollRun_companyId_month_year_key" ON "PayrollRun"("companyId", "month", "year");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "EmployeeAdvance_deductionStatus_idx" ON "EmployeeAdvance"("deductionStatus");

-- CreateIndex
CREATE INDEX "EmployeeAdvance_deductionMonth_deductionYear_idx" ON "EmployeeAdvance"("deductionMonth", "deductionYear");

-- CreateIndex
CREATE INDEX "SalaryRevision_employeeId_effectiveFrom_idx" ON "SalaryRevision"("employeeId", "effectiveFrom");
