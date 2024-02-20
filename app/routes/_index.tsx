import { type MetaFunction } from "@remix-run/node";
import { Form } from '@remix-run/react';
import readXlsxFile, { readSheetNames } from 'read-excel-file';
import { spreadSheetSchema } from '../services/types'
import { ChangeEvent } from 'react';
import React from 'react';
import { LoadingData } from '~/components/shared/loader';


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
			debugger
			setData(JSON.stringify(spreadsheetLists));
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
				<input  type="file" id="input" name="fileUpload" disabled={isloading} onChange={(event) => handleFileChange(event, setSpreadsheetData, setIsLoading)} />
				<button className='bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-100 p-1 pl-2 pr-2 rounded-lg text-white' type="submit" disabled={isloading || spreadsheetData.length == 0}>Upload</button>
			</Form>
			{isloading && <LoadingData />}

		</div>
	);
}
