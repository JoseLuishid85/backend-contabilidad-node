const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Supplier extends Model { }

Supplier.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rif: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: { isEmail: true }
    },
    contact_person: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Supplier',
    tableName: 'suppliers',
    timestamps: true,
});

module.exports = Supplier;