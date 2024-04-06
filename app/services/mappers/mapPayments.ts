//	Desc: Mappers for payments

	export const mapPayments = (item) => {

debugger
		
		
	 const payments = item.map((row) => {
			const {year,month} = row;
			const bills: { title: any; value: any; dueDate: any; paid: boolean; }[] = [];
			const incomes: { title: any; value: any; }[] = [];

			row.rows.map((items: { finalidade: any; valor: any; vencimento: any; pago: any; origem: any; rendimento: any; }) => {

				const { finalidade, valor, vencimento, pago, origem, rendimento } = items;
				const bill = {
					title: finalidade,
					value: valor,
					dueDate: vencimento,
					paid: pago === 'Sim',
				}

					if(origem){
		const income = {
		title: origem,
		value: rendimento
	}
	incomes.push(income);
	}
	bills.push(bill);

				
})
			
return  {
	month,
	year
};
			
		});
		
return payments;
	}


