const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const {
    createPurchase,
    getPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase
} = require('../controllers/purchaseControllers.js');

const routes = express.Router();

routes.post('/', checkAuth, createPurchase);
routes.get('/', checkAuth, getPurchases);
routes.get('/:id', checkAuth, getPurchaseById);
routes.put('/:id', checkAuth, updatePurchase);
routes.delete('/:id', checkAuth, deletePurchase);

module.exports = routes;