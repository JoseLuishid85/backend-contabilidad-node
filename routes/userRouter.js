const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const { createUser, getUsers, getUserById, updateUser, toggleUserStatus} = require('../controllers/userControllers.js');

const routes = express.Router();

//validarJWT
routes.post('/', checkAuth, createUser);
routes.get('/', checkAuth, getUsers);
routes.get('/:id', checkAuth, getUserById);
routes.put('/:id', checkAuth, updateUser);
routes.put('/changestatus/:id', checkAuth, toggleUserStatus);


module.exports = routes;