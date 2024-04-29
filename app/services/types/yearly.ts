import { Bill, Income } from '.';
import { Monthly } from './monthly';

export type Yearly = {
	months: Monthly[],
	year: string,
	bills: Bill[],
	incomes: Income[]
}