// Filename: prismaHandler.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertPayment(paymentData) {
  try {
    const newPayment = await prisma.payments.create({
      data: paymentData,
    });
    return newPayment;
  } catch (error) {
    throw new Error(`Failed to insert payment: ${error}`);
  }
}

async function findPaymentById(paymentId) {
  try {
    const payment = await prisma.payments.findUnique({
      where: { id: paymentId },
      include: { bills: true, incomes: true },
    });
    return payment;
  } catch (error) {
    throw new Error(`Failed to find payment: ${error}`);
  }
}

async function findPaymentsByYear(year) {
  try {
    const payments = await prisma.payments.findMany({
      where: { year },
      include: { bills: true, incomes: true },
    });
    return payments;
  } catch (error) {
    throw new Error(`Failed to find payments: ${error}`);
  }
}

export { insertPayment, findPaymentById, findPaymentsByYear };
