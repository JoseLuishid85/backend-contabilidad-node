const User = require("../models/User");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    /*
    if (!req.user) {
        return res.status(500).json({ msg: 'Token Error' });
    }*/
    
    const data = req.body;

    
    try {

        await User.sync();

        const emailExists = await User.findOne({ where: { email: data.email } });
        if (emailExists) {
            return res.status(400).json({ msg: 'El correo electrónico ya está en uso' });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await User.create({
            ...data,
            password: hashedPassword,
        });

        const { password, ...userWithoutPassword } = newUser.toJSON();

        res.json({
            msg: "Usuario creado con éxito",
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al procesar datos',
        })
    }
}

const getUsers = async (req, res) => {

    let users = await User.findAll({ attributes: { exclude: ['password'] }  });

    res.status(200).json(users);
}

const getUserById = async (req, res) => {
    let id = req.params['id'];

    try {
        let user = await User.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no existe en la base de dato',
            });
        }

        res.json({
            user,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al procesar datos',
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
         await User.update({
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role,
            email: data.email
        }, { where: { id } });


        const updatedUser = await User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } } )


        res.json({ ok: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al procesar datos',
        });
    }
}

const toggleUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const newStatus = !status;

    try {
        await User.update({ status: newStatus }, { where: { id } });
        
        const updatedUser = await User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } } )

        res.status(200).json({
            ok: true,
            user: updatedUser,
            newStatus
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al procesar datos',
        });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    toggleUserStatus
};