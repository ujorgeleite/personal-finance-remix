-- CreateTable
CREATE TABLE "Payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
    "month" TEXT
);

-- CreateTable
CREATE TABLE "Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "recurrence" TEXT NOT NULL,
    "paymentId" INTEGER NOT NULL,
    CONSTRAINT "Income_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "dueDate" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "recurrence" TEXT NOT NULL,
    "paymentId" INTEGER NOT NULL,
    CONSTRAINT "Bill_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
