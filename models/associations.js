const Supplier = require('./Supplier');
const Purchase = require('./Purchase');
const User = require('./User');

const setupAssociations = () => {
    // Relación: Un Proveedor tiene muchas Compras
    Supplier.hasMany(Purchase, {
        foreignKey: 'supplier_id',
        as: 'purchases' // Alias para cuando hagas consultas
    });

    // Relación: Una Compra pertenece a un Proveedor
    Purchase.belongsTo(Supplier, {
        foreignKey: 'supplier_id',
        as: 'supplier'
    });

    console.log("Asociaciones cargadas correctamente.");
};

module.exports = setupAssociations;