

import { Income, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertIncome(paymentData: Income) {
  try {
    const newPayment = await prisma.income.create({
      data: paymentData,
    });
    return newPayment;
  } catch (error) {
    throw new Error(`Failed to insert income: ${error}`);
  }
}


async function bulkInsertionIncomes(incomes: Income[], paymentId: number) {
		try {
				const incomesCreated = await Promise.all(
						incomes.map(data =>
								prisma.income.create({ data: { ...data, paymentId } })
						)
				);
				return incomesCreated;
		} catch (error) {
				throw new Error(`Failed to insert income: ${error}`);
		}
}

async function deleteAllIncomes() {
		try {
				await prisma.income.deleteMany({});
		} catch (error) {
				throw new Error(`Failed to delete all incomes: ${error}`);
		}
}

async function findIncomeById(paymentId: number) {
  try {
    const payment = await prisma.payments.findUnique({
      where: { id: paymentId },
      include: { bills: true, incomes: true },
    });
    return payment;
  } catch (error) {
    throw new Error(`Failed to find income: ${error}`);
  }
}



export { insertIncome, findIncomeById, deleteAllIncomes, bulkInsertionIncomes };
