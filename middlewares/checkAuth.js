const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }
            });

            if (!req.user) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            return next();
        } catch (error) {
            return res.status(403).json({ msg: 'Token no válido o expirado' });
        }
    }

    if (!token) {
        return res.status(401).json({ msg: 'Token no válido o inexistente' });
    }
};

module.exports = checkAuth;