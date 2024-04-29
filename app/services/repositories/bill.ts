// Filename: prismaHandler.ts

import { Bill, PrismaClient } from '@prisma/client';
import { Income, Yearly } from '../types';

const prisma = new PrismaClient();

async function insertBill(paymentData: Bill) {
  try {
    const newBill = await prisma.bill.create({
      data: paymentData});
    return newBill;
  } catch (error) {
    throw new Error(`Failed to insert payment: ${error}`);
  }
}

async function bulkInsertionBills(bills: Bill[], paymentId: number) {
	try {
		const billsCreated = await Promise.all(
			bills.map(data =>  
				prisma.bill.create({data: { ...data, paymentId }}))
	);
			return billsCreated;
	} catch (error) {
			throw new Error(`Failed to insert payment: ${error}`);
	}
}

async function deleteAllBills() {	
	try {
		await prisma.bill.deleteMany({});
	} catch (error) {
		throw new Error(`Failed to delete all bills: ${error}`);
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



export { insertBill, findBillById, bulkInsertionBills, deleteAllBills };
