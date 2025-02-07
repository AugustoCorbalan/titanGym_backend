import sequelize from '../db.js';

// Importar los modelos
import User from './user.js';
import Activity from './activity.js';
import Membership from './membership.js';
import Payment from './payment.js';
import Debt from './debt.js';
import Buy from './buy.js';
// Importaciones de modelos de productos
import ProductIndumentary from './products/productIndumentary.js';
import IndumentaryType from './products/indumentaryType.js';
import NutrifitType from './products/nutrifitType.js';
import ProductNutrifit from './products/productNutrifit.js';

// Definir relaciones

// Usuarios - Actividades
User.belongsToMany(Activity, { through: 'UserActivities' });
Activity.belongsToMany(User, { through: 'UserActivities' });

// Usuarios - Membresías
User.hasMany(Membership, {foreignKey: 'userId'});
Membership.belongsTo(User, {foreignKey: 'userId'});

// // Actividad - Membresía
Activity.hasMany(Membership, {foreignKey: 'activityId'});
Membership.belongsTo(Activity, { foreignKey: 'activityId' });

// // Usuario - Deuda
User.hasMany(Debt, { foreignKey: 'userId' }); // Un usuario puede tener varias deudas
Debt.belongsTo(User, { foreignKey: 'userId' });

// // Membresía - Deuda
Membership.belongsToMany(Debt, { through: 'DebtMemberships' }); // Una membresía puede tener varias deudas, además que una deuda puede corresponder a varias membresías.
Debt.belongsToMany(Membership, { through: 'DebtMemberships' }); 

// // Usuario - Payment
User.hasMany(Payment, { foreignKey: 'userId' }); // Un usuario puede realizar múltiples pagos
Payment.belongsTo(User, { foreignKey: 'userId' });

// // Deuda - Payment
Debt.hasMany(Payment, { foreignKey: 'debtId' }); // Una deuda puede estar cubierta por múltiples pagos
Payment.belongsTo(Debt, { foreignKey: 'debtId' });

// // Buy - User
User.hasMany(Buy, { foreignKey: 'userId' }); // Un usuario puede realizar múltiples compras
Buy.belongsTo(User, { foreignKey: 'userId' });

// // Buy - Debt
Buy.hasOne(Debt, {foreignKey: 'buyId'});
Debt.belongsTo(Buy, {foreignKey: 'buyId'});

// // Buy - Payment
Buy.hasMany(Payment, { foreignKey: 'debtId' }); // Una compra puede estar cubierta por múltiples pagos
Payment.belongsTo(Buy, { foreignKey: 'debtId' });

// // ProductIndumentary - Buy
ProductIndumentary.belongsToMany(Buy, { through: 'IndumentaryBuy' }); // Un producto puede tener varias compras, ademas que una compra puede ser de varios productos
Buy.belongsToMany(ProductIndumentary, { through: 'IndumentaryBuy' }); 

// // ProductNutrifit - Buy
ProductNutrifit.belongsToMany(Buy, { through: 'NutriFitBuy' }); // Un producto puede tener varias compras, ademas que una compra puede ser de varios productos
Buy.belongsToMany(ProductNutrifit, { through: 'NutriFitBuy' }); 

// Relaciones de productos y tipos de productos -------------------------------------------------------------

//Indumentaria - Tipo de indumentaria
IndumentaryType.hasMany(ProductIndumentary, { foreignKey: 'productTypeId', as: 'products' });
ProductIndumentary.belongsTo(IndumentaryType, { foreignKey: 'productTypeId', as: 'productType' });

//Nutrifit - Tipo de producto nutrifit
NutrifitType.hasMany(ProductNutrifit, { foreignKey: 'productTypeId', as: 'products' });
ProductNutrifit.belongsTo(NutrifitType, { foreignKey: 'productTypeId', as: 'productType' });




export { sequelize, User, Activity, Membership, Payment, Debt, Buy, ProductIndumentary, IndumentaryType, NutrifitType, ProductNutrifit};