import tailwindConfig from 'tailwind.config'
const theme  = tailwindConfig.theme.extend;
export const style= {
	actionButton: 'bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-100 p-1 pl-2 pr-2 rounded-lg text-white',
	exampleHowToUseCssInlineHere: {background: `${theme.colors.primary}`}
}