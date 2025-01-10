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
User.hasMany(Membership, {foreignKey: 'googleId'});
Membership.belongsTo(User, {foreignKey: 'googleId'});

// Actividad - Membresía
Activity.hasMany(Membership, {foreignKey: 'name'});
Membership.belongsTo(Activity, { foreignKey: 'name' });

// Usuario - Deuda
User.hasMany(Debt, { foreignKey: 'googleId' }); // Un usuario puede tener varias deudas
Debt.belongsTo(User, { foreignKey: 'googleId' });

// Membresía - Deuda
Membership.hasMany(Debt, { foreignKey: 'id' }); // Una membresía puede generar deudas
Debt.belongsTo(Membership, { foreignKey: 'id' }); 

// Usuario - Pago
User.hasMany(Payment, { foreignKey: 'googleId' }); // Un usuario puede realizar múltiples pagos
Payment.belongsTo(User, { foreignKey: 'googleId' });

// Deuda - Pago
Debt.hasMany(Payment, { foreignKey: 'id' }); // Una deuda puede estar cubierta por múltiples pagos
Payment.belongsTo(Debt, { foreignKey: 'id' });

export { sequelize, User, Activity, Membership, Payment};