import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import GenericErrorBoundary from '~/components/shared/GenericErrorBoundary';
import { findAllPayments } from '~/services/repositories/payments';


export async function loader() {
	const data = await findAllPayments();


	return { data }
}


export default function Index() {
	const { data } = useLoaderData<typeof loader>() as { data: any };
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

export function ErrorBoundary({ error }: any) {
	console.log(error);
	return <GenericErrorBoundary {...error} />
}