const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    res.json({ msg: 'Todo Bien aqui' });
    /*
    try {
        // 1. Verificar si el usuario existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'El usuario no existe' });
        }

        // 2. Verificar si el usuario está activo (status: true)
        if (!user.status) {
            return res.status(403).json({ msg: 'Tu cuenta está desactivada' });
        }

        // 3. Comprobar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        // 4. Generar el JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '5D' } 
        );

        res.json({
            ok: true,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }*/
};

module.exports = { login };