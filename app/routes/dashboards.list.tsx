import { ActionFunctionArgs } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import React, { useState } from 'react';
import { LoadingData } from '~/components/shared/loader';
import { insertPayment } from '~/services/repositories/payments';
import { Yearly } from '~/services/types';

const mockedData = [
	{
		"rows": [
			{
				"finalidade": "Itaucard",
				"valor": 857.29,
				"vencimento": "6",
				"pago": "Sim",
				"origem": "Nando (Salário)",
				"rendimento": 3300
			},
			{
				"finalidade": "Pedralli",
				"valor": 818.4,
				"vencimento": "7",
				"pago": "Sim",
				"origem": "Ramona",
				"rendimento": 400
			},
			{
				"finalidade": "Pensão",
				"valor": 300,
				"vencimento": "10",
				"pago": "Sim",
				"origem": "Ramona(Seguro 02/04)",
				"rendimento": 788
			},
			{
				"finalidade": "Luz",
				"valor": 162.69,
				"vencimento": "10",
				"pago": "Sim",
				"origem": "PPR",
				"rendimento": 800
			},
			{
				"finalidade": "Vivo",
				"valor": 125,
				"vencimento": "10",
				"pago": "Sim"
			},
			{
				"finalidade": "Caixa (Cartão)",
				"valor": 399.59,
				"vencimento": "11",
				"pago": "Sim"
			},
			{
				"finalidade": "Senac (02/05)",
				"valor": 347.14,
				"vencimento": "15",
				"pago": "Sim"
			},
			{
				"finalidade": "Casa (25/36)",
				"valor": 470,
				"vencimento": "15",
				"pago": "Não"
			},
			{
				"finalidade": "C&A",
				"valor": 258.07,
				"vencimento": "16",
				"pago": "Sim"
			},
			{
				"finalidade": "Tng",
				"valor": 339.13,
				"vencimento": "17",
				"pago": "Sim"
			},
			{
				"finalidade": "Vó",
				"valor": 160,
				"vencimento": "17",
				"pago": "Não"
			},
			{
				"finalidade": "Gaston",
				"valor": 56,
				"vencimento": "11",
				"pago": "Sim"
			}
		],
		"errors": [],
		"year": "2016",
		"month": "Fevereiro"
	},
	{
		"rows": [
			{
				"finalidade": "Itaucard",
				"valor": 732.83,
				"vencimento": "6",
				"pago": "Sim",
				"origem": "Nando (Salário)",
				"rendimento": 3385
			},
			{
				"finalidade": "Pedralli",
				"valor": 909.93,
				"vencimento": "7",
				"pago": "Sim",
				"origem": "Ramona",
				"rendimento": 400
			},
			{
				"finalidade": "Pensão",
				"valor": 300,
				"vencimento": "10",
				"pago": "Sim",
				"origem": "Ramona(Seguro 03/04)",
				"rendimento": 788
			},
			{
				"finalidade": "Luz",
				"valor": 164.27,
				"vencimento": "10",
				"pago": "Sim"
			},
			{
				"finalidade": "Vivo",
				"valor": 59.09,
				"vencimento": "10",
				"pago": "Sim"
			},
			{
				"finalidade": "Senf",
				"valor": 76,
				"vencimento": "10",
				"pago": "Sim"
			},
			{
				"finalidade": "Moto 01 /36",
				"valor": 404,
				"vencimento": "10",
				"pago": "Sim"
			},
			{
				"finalidade": "Seguro Moto 01 / 09",
				"valor": 151.22,
				"vencimento": "10",
				"pago": "Sim"
			},
			{
				"finalidade": "Caixa (Cartão)",
				"valor": 601.64,
				"vencimento": "11",
				"pago": "Sim"
			},
			{
				"finalidade": "Gaston",
				"valor": 155.48,
				"vencimento": "11",
				"pago": "Não"
			},
			{
				"finalidade": "Senac (02/05)",
				"valor": 347.14,
				"vencimento": "15",
				"pago": "Sim"
			},
			{
				"finalidade": "Casa (25/36)",
				"valor": 470,
				"vencimento": "15",
				"pago": "Não"
			},
			{
				"finalidade": "C&A",
				"valor": 96.49,
				"vencimento": "16",
				"pago": "Sim"
			},
			{
				"finalidade": "Tng",
				"valor": 452.5,
				"vencimento": "17",
				"pago": "Sim"
			},
			{
				"finalidade": "Vó",
				"valor": 120,
				"vencimento": "17",
				"pago": "Sim"
			}
		],
		"errors": [],
		"year": "2016",
		"month": "Março"
	}];


export const action = async ({ request }: ActionFunctionArgs) => {

	const formData = await request.formData();
	const file = formData.get("spreadSheetField") as unknown as string;
	const payments: Yearly[] = JSON.parse(file);


	//iterar nos payments e inserir no banco	
	//após terminar de inserir, retornar os dados para adicionar o id de payments nos bills e incomes
	// insertPayment(payments[0]);

	return { data: payments };
}
export default function Index() {
	const { data } = useActionData<typeof action>() as { data: any };
	// const data = mockedData;
	const [expanded, setExpanded] = useState<number | null>(null);
	debugger

	const toggleExpanded = (index: number) => {
		if (expanded === index) {
			setExpanded(null);
		} else {
			setExpanded(index);
		}
	};

	const renderList = () => {
		if (!data) return <p>Sem dados para exibir</p>;

		return data.map((monthData, index) => (
			<div key={index}>
				<button
					className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-2 full-width"
					onClick={() => toggleExpanded(index)}
				>
					{`Month: ${monthData.month}, Year: ${monthData.year}`}
				</button>
				{expanded === index && (
					<ul className="space-y-2">
						{monthData.bills?.map((item, i) => (
							<li
								key={i}
								className={item.paid === true ? "bg-green-100 rounded p-4" : "bg-gray-100 rounded p-4"}
							>
								<p><strong>Finalidade:</strong> {item.title}</p>
								<p><strong>Valor:</strong> {item.value}</p>
								<p><strong>Vencimento:</strong> {item.dueDate}</p>
								<p><strong>Pago:</strong> {item.paid === true ? "Sim" : "Não"}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		));
	};

	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">Dashboards List</h1>
			{renderList()}
		</div>
	);
}