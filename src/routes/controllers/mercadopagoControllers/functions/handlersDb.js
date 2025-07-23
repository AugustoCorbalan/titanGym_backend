import { ProductIndumentary, ProductNutrifit, Buy, Debt, Payment} from "../../../../../database/models/index.js";

export const handlerDbBuyIndumentary = async (data, amount)=>{
    const { google_id, id_product } = data;
    const accountDate = new Date().toISOString().split('T')[0];
    const product = await ProductIndumentary.findByPk(id_product);

    const dataBuy = {
        amount,
        buyDate: accountDate,
        cant: 1, 
        userId: (google_id == '')? null : google_id,
    }
    console.log('dataBuy', dataBuy);
    try {
        const accountBuy = await Buy.create(dataBuy);
        accountBuy.addProductIndumentary(product);
    } catch (error) {
        console.log("Error al instanciar la compra en la base de datos.");
        console.log(error);
    }

}

export const handlerDbBuyNutrifit = async (data, amount)=>{
    const { google_id, id_product } = data;
    const accountDate = new Date().toISOString().split('T')[0];
    const product = await ProductNutrifit.findByPk(id_product);

    const dataBuy = {
        amount,
        buyDate: accountDate,
        cant: 1, 
        userId: (google_id == '')? null : google_id,
    }
    try {
        const accountBuy = await Buy.create(dataBuy);
        accountBuy.addProductNutrifit(product);
    } catch (error) {
        console.log("Error al instanciar la compra en la base de datos.");
        console.log(error);
    }

}

export const handlerDbPayDebt = async (bill_id, amount)=>{
    
    const accountDate = new Date().toISOString().split('T')[0];
    
    try {
        const bill = await Debt.findByPk(bill_id);
        if (!bill) {
               throw new Error("No se encontró la factura con ese ID.");
           }
           if(parseFloat(bill.dataValues.amount) === parseFloat(amount)){
            //Creo una instancia de pago "payment":
            const payment_data = {
                userId: bill.dataValues.userId,
                debtId: bill_id,
                amount,
                paymentDate: accountDate,
                method: 'mercadoPago'
            };
            await Payment.create(payment_data);

            //Modifico el estado de la factura a pagada:
            await bill.update({
                paymentDate: accountDate, 
                status: 'Pagada'
            });
        
        console.log("Factura actualizada correctamente.");
        }else{
            throw new Error("El monto pagado es distinto al de la factura!!!");
        }
        
    } catch (error) {
        console.log("Error al instanciar la compra en la base de datos.");
        console.log(error);
    }

}