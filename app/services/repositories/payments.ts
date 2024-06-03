
import { Payments, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function insertPayment(paymentData: Payments) {
  try {
    const newPayment = await prisma.payments.create({
      data: paymentData,
    });
    return newPayment;
  } catch (error) {
    throw new Error(`Failed to insert payment: ${error}`);
  }
}



async function findAllPayments() {
	try {
			const payments = await prisma.payments.findMany({
				select: {
					id:true,
					year:true,
					month:true,
					bills:true,
					incomes:true
				}
			});
			return payments;
	} catch (error) {
			throw new Error(`Failed to list all payments: ${error}`);
	}
}


async function findPaymentById(paymentId: number) {
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

async function findPaymentsByYear(year: string) {
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


async function deleteAllPayments() {
		try {
				await prisma.payments.deleteMany({});
		} catch (error) {
				throw new Error(`Failed to delete all payments: ${error}`);
		}
}

export { insertPayment,findAllPayments, findPaymentById, findPaymentsByYear
, deleteAllPayments };
