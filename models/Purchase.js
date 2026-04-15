const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Purchase extends Model { }

Purchase.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'suppliers',
            key: 'id'
        }
    },
    invoice_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    purchase_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method: {
        type: DataTypes.STRING(50), // Cash, Transfer, Credit
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'completed' // pending, completed, cancelled
    }
}, {
    sequelize,
    modelName: 'Purchase',
    tableName: 'purchases',
    timestamps: true,
});

module.exports = Purchase;