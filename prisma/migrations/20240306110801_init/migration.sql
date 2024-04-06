/*
  Warnings:

  - You are about to drop the column `valor` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Bill` table. All the data in the column will be lost.
  - Added the required column `value` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "recurrence" TEXT NOT NULL,
    "paymentId" INTEGER NOT NULL,
    CONSTRAINT "Income_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Income" ("id", "paymentId", "recurrence", "title") SELECT "id", "paymentId", "recurrence", "title" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
CREATE TABLE "new_Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "dueDate" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "recurrence" TEXT NOT NULL,
    "paymentId" INTEGER NOT NULL,
    CONSTRAINT "Bill_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bill" ("dueDate", "id", "paid", "paymentId", "recurrence", "title") SELECT "dueDate", "id", "paid", "paymentId", "recurrence", "title" FROM "Bill";
DROP TABLE "Bill";
ALTER TABLE "new_Bill" RENAME TO "Bill";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
