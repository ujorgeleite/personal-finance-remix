export type Bill  = {
	id:string,
	title:string,
	value: number,
	dueDate: string,
	paid: boolean,
	paymentId: string,
}