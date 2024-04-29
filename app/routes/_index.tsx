import { type MetaFunction } from "@remix-run/node";
import { Form } from '@remix-run/react';
import readXlsxFile, { readSheetNames } from 'read-excel-file';
import { spreadSheetSchema } from '../services/types'
import { ChangeEvent } from 'react';
import React from 'react';
import { LoadingData } from '~/components/shared/loader';
import { style } from '~/components/shared/styles';
import { mapPayments } from '~/services/mappers/mapPayments';
import { deleteAllPayments, insertPayment } from '~/services/repositories/payments';
import { deleteAllBills } from '~/services/repositories/bill';
import { deleteAllIncomes } from '~/services/repositories/income';


export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

interface SheetNamesType {
	name: string;
}


const handleFileChange = async (event: ChangeEvent<HTMLInputElement>, setData: any, setIsLoading: any) => {
	const file = event.target.files?.[0];
	setIsLoading(true);

	try {
		if (file) {
			const sheetNames: string[] = await readSheetNames(file);
			const spreadsheetPromises = sheetNames.map((sheetName) => readXlsxFile(file, { schema: spreadSheetSchema, sheet: sheetName }))

			const spreadsheetLists = await Promise.all(spreadsheetPromises)
			const listByYearMonth = spreadsheetLists.map((spreadsheetList, index) => {
				const year = sheetNames[index].slice(sheetNames[index].length - 4, sheetNames[index].length);
				const month = sheetNames[index].replace(year, '');


				return { ...spreadsheetList, year, month }

			}).filter((item) => item.year.includes('20'));
			debugger
			const payments = mapPayments(listByYearMonth);
			setData(JSON.stringify(payments));
			setIsLoading(false);
		}
	} catch (e) {
		console.log("🚀 ~ erro ao tentar fazer upload do arquivo:", e)
		alert('Erro ao tentar fazer upload do arquivo');
		setIsLoading(false);
	};
}
export default function Index() {
	const [spreadsheetData, setSpreadsheetData] = React.useState<string>('');
	const [isloading, setIsLoading] = React.useState<boolean>(false);

	return (
		<div className='m-8'>

			<Form method='post' encType='multipart/form-data' action='/dashboards/list'>
				<input type='hidden' name='spreadSheetField' value={spreadsheetData} />
				<input type="file" id="input" name="fileUpload" disabled={isloading} onChange={(event) => handleFileChange(event, setSpreadsheetData, setIsLoading)} />
				<button className={style.actionButton} type="submit" disabled={isloading || spreadsheetData.length == 0}>Upload</button>
			</Form>
			{isloading && <LoadingData />}

		</div >
	);
}
