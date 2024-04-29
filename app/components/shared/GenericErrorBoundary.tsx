interface GenericErrorBoundaryProps {
	name: string;
	message: string;
	stack?: string;
}

const GenericErrorBoundary = ({ message, stack }: GenericErrorBoundaryProps) => {
	return (
		<div>
			<h1>Error</h1>
			<p className='text-red-200'>{message}</p>
			<p>The stack trace is:</p>
			<pre className='text-red-200'>{stack}</pre>
		</div>
	);
}

export default GenericErrorBoundary;