const Purchase = require("../models/Purchase");
const Supplier = require("../models/Supplier");

const createPurchase = async (req, res) => {
    const data = req.body;
    try {
        await Purchase.sync();

        // Opcional: Validar si el proveedor existe
        const supplier = await Supplier.findByPk(data.supplier_id);
        if (!supplier) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }

        const newPurchase = await Purchase.create(data);

        res.status(201).json({
            ok: true,
            msg: "Compra registrada con éxito",
            purchase: newPurchase
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al registrar la compra' });
    }
}

const getPurchases = async (req, res) => {
    try {
        // Incluimos los datos del proveedor para que el reporte sea útil
        const purchases = await Purchase.findAll({
            include: [{ model: Supplier, attributes: ['name', 'rif'] }]
        });
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener compras' });
    }
}

const getPurchaseById = async (req, res) => {
    const { id } = req.params;
    try {
        const purchase = await Purchase.findByPk(id, {
            include: [{ model: Supplier, attributes: ['name', 'rif', 'email'] }]
        });

        if (!purchase) {
            return res.status(404).json({ ok: false, msg: 'Compra no encontrada' });
        }
        res.json({ purchase });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al procesar datos' });
    }
}

const updatePurchase = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        await Purchase.update(data, { where: { id } });
        const updatedPurchase = await Purchase.findByPk(id);
        res.json({ ok: true, purchase: updatedPurchase });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar la compra' });
    }
}

const deletePurchase = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Purchase.destroy({ where: { id } });
        if (deleted) {
            res.json({ ok: true, msg: 'Registro de compra eliminado' });
        } else {
            res.status(404).json({ ok: false, msg: 'Compra no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar' });
    }
}

module.exports = {
    createPurchase,
    getPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase
};