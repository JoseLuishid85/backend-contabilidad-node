const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} = require('../controllers/supplierControllers.js');

const routes = express.Router();

routes.post('/', checkAuth, createSupplier);
routes.get('/', checkAuth, getSuppliers);
routes.get('/:id', checkAuth, getSupplierById);
routes.put('/:id', checkAuth, updateSupplier);
routes.delete('/:id', checkAuth, deleteSupplier);

module.exports = routes;