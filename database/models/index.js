import sequelize from '../db.js';

// Importar los modelos
import User from './user.js';
import Activity from './activity.js';
import Membership from './membership.js';
import Payment from './payment.js';
import Debt from './debt.js';

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

// // Usuario - Pago
User.hasMany(Payment, { foreignKey: 'userId' }); // Un usuario puede realizar múltiples pagos
Payment.belongsTo(User, { foreignKey: 'userId' });

// // Deuda - Pago
Debt.hasMany(Payment, { foreignKey: 'debtId' }); // Una deuda puede estar cubierta por múltiples pagos
Payment.belongsTo(Debt, { foreignKey: 'debtId' });

export { sequelize, User, Activity, Membership, Payment, Debt};