
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { bulkInsertionBills, deleteAllBills } from '~/services/repositories/bill';
import { deleteAllPayments, insertPayment } from '~/services/repositories/payments';


import { Payments } from '@prisma/client';
import { bulkInsertionIncomes, deleteAllIncomes } from '~/services/repositories/income';
import { useActionData, useLoaderData } from '@remix-run/react';



export async function action({ request }: ActionFunctionArgs) {

	try {

		const formData = await request.formData();
		const file = formData.get("spreadSheetField") as unknown as string;
		const payments: { year: string, month: string, bills: [], incomes: [] }[] = JSON.parse(file);


		await Promise.all([deleteAllBills(), deleteAllIncomes()])
		await deleteAllPayments();



		payments.forEach(async (payment) => {
			const { year, month, bills, incomes } = payment;

			const newPayment = await insertPayment({ year, month } as Payments);
			await Promise.all([bulkInsertionBills(bills, newPayment.id), bulkInsertionIncomes(incomes, newPayment.id)]);
		});

		console.log(payments);

		return redirect('/dashboards/list')
	} catch (ex) {
		console.log('error: ', ex)
		return { error: true }
	}
}

export default function Index() {
	const data = useActionData<typeof action>();

	return data?.error ? 'Error' : 'Success'
}