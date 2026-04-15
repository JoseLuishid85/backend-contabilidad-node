const Supplier = require("../models/Supplier");

const createSupplier = async (req, res) => {
    const data = req.body;
    try {
        await Supplier.sync();

        const supplierExists = await Supplier.findOne({ where: { rif: data.rif } });
        if (supplierExists) {
            return res.status(400).json({ msg: 'El RIF ya se encuentra registrado' });
        }

        const newSupplier = await Supplier.create(data);

        res.status(201).json({
            msg: "Proveedor creado con éxito",
            supplier: newSupplier
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al procesar datos' });
    }
}

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener proveedores' });
    }
}

const getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ ok: false, msg: 'Proveedor no encontrado' });
        }
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al procesar datos' });
    }
}

const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        await Supplier.update(data, { where: { id } });
        const updatedSupplier = await Supplier.findByPk(id);
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar' });
    }
}

const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Supplier.destroy({ where: { id } });
        if (deleted) {
            res.json({ ok: true, msg: 'Proveedor eliminado correctamente' });
        } else {
            res.status(404).json({ ok: false, msg: 'Proveedor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar' });
    }
}

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};