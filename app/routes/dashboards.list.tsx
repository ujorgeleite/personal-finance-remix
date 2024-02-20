import { ActionFunctionArgs } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { LoadingData } from '~/components/shared/loader';




export const action = async ({ request }: ActionFunctionArgs) => {

	const formData = await request.formData();
	const file = formData.get("spreadSheetField") as unknown as string;

	return JSON.parse(file)
}
export default function Index() {
	const data = useActionData<typeof action>();
	return (
		<div>
			<h1>Dashboards List</h1>
			{data ? JSON.stringify(data): 'Sem dados para exibir'}
		</div>
	);
}