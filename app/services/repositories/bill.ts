// Filename: prismaHandler.ts

import { Bill, PrismaClient } from '@prisma/client';
import { Income, Yearly } from '../types';

const prisma = new PrismaClient();

async function insertBill(paymentData: Bill) {
  try {
    const newPayment = await prisma.bill.create({
      data: paymentData,
    });
    return newPayment;
  } catch (error) {
    throw new Error(`Failed to insert payment: ${error}`);
  }
}

async function findBillById(paymentId: number) {
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



export { insertBill, findBillById };
