/*
  Warnings:

  - You are about to drop the column `upiId` on the `Company` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "gstNumber" TEXT,
    "panNumber" TEXT,
    "logo" TEXT,
    "bankName" TEXT,
    "accountHolderName" TEXT,
    "accountNumber" TEXT,
    "ifscCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Company" ("accountHolderName", "accountNumber", "address", "bankName", "companyName", "createdAt", "email", "gstNumber", "id", "ifscCode", "logo", "ownerName", "panNumber", "phone", "updatedAt") SELECT "accountHolderName", "accountNumber", "address", "bankName", "companyName", "createdAt", "email", "gstNumber", "id", "ifscCode", "logo", "ownerName", "panNumber", "phone", "updatedAt" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
