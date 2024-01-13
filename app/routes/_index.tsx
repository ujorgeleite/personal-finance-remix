import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import readXlsxFile, { ParsedObjectsResult } from 'read-excel-file';
import { readFile } from 'fs/promises';
import { spreadSheetSchema } from '../services/types'



//remix load data
export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};


interface SheetNamesType {
	name: string;
}

const handleFileChange = async (event) => {
	const file = event.target.files[0];

	const sheetNames = await readXlsxFile(file, { getSheets: true });
	const lists = sheetNames.map((item) => {
		const rows = readXlsxFile(file, { schema: spreadSheetSchema, sheet: item.name });
		return rows;
	})
	console.log("🚀 ~ file: _index.tsx:29 ~ lists ~ lists:", lists)

	const rows = await Promise.all(lists);
	console.log("🚀 ~ file: _index.tsx:31 ~ handleFileChange ~ rows:", rows)





	console.log("🚀 ~ file: _index.tsx:34 ~ handleFileChange ~ sheetNames:", rows.length)

};
export default function Index() {


	return (
		<div>
			<input type="file" id="input" onChange={handleFileChange} />

		</div>
	);
}
