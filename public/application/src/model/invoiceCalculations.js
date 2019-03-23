class InvoiceCalculations{
    
    calculateSubTotal = (invoiceToEdit) =>{
        let subTotal = 0;
        invoiceToEdit.services.forEach(service =>{
          subTotal += service.unitPrice * service.quantity;
        });
        const salesTaxVal = subTotal*invoiceToEdit.salesTax/100;
        invoiceToEdit.subTotal = subTotal;
        invoiceToEdit.salesTaxVal = salesTaxVal;
        invoiceToEdit.totalDue = salesTaxVal + subTotal;
        return invoiceToEdit;
    }

    calculateChangedTax = (invoiceToEdit,newSalesTax) =>{
        const {subTotal} = invoiceToEdit;
        invoiceToEdit.salesTaxVal = subTotal*newSalesTax/100;
        invoiceToEdit.totalDue = subTotal + invoiceToEdit.salesTaxVal;
        return invoiceToEdit;
    }

}
    
export default InvoiceCalculations;