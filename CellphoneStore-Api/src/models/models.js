import { User } from './User.js';
import { Product } from './Product.js';
import { Order } from './Order.js';

// --- DEFINICIÓN DE ASOCIACIONES ---



// 1. Relación Uno a Muchos (User - Order)
// Un usuario puede realizar muchos pedidos.
// Esto añade automáticamente 'userId' a la tabla 'orders'.

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// 2. Relación Muchos a Muchos (Order - Product)
// Un pedido tiene muchos productos y un producto puede estar en muchos pedidos.
// Sequelize creará la tabla intermedia 'order_items' automáticamente.

Order.belongsToMany(Product, { through: 'order_items' });
Product.belongsToMany(Order, { through: 'order_items' });

// Exportamos todos los modelos y la conexión si es necesario
export {
  User,
  Product,
  Order
};

