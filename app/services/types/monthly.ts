import type { Income } from './income';
import { Bill } from './bill';

export type Monthly = {
	Incomes:	Income[],
	Bills: 		Bill[],
	Month:			string,
}