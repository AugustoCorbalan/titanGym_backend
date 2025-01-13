const getDateNextMonth = (accountDate)=>{
    
        const date = new Date(accountDate);
        
        // Aumentar el mes en 1
        const nextMounth = date.getMonth() + 1;
      
        // Configurar la nueva fecha
        date.setMonth(nextMounth);
      
        // Verificar si el día desborda (por ejemplo, 31/01 a 03/03)
        if (date.getMonth() !== (nextMounth % 12)) {
          // Ajustar al último día del mes
          date.setDate(0);
        }
      
        return date;
}

export default getDateNextMonth;