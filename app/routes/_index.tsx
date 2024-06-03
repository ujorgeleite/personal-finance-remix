import { type MetaFunction } from "@remix-run/node";
import UploadForm from '../components/upload/uploadForm';


export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};


export default function Index() {

	return (
		<UploadForm />
	);
}
