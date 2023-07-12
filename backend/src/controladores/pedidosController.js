// Models
const User = require('../modelos/usuario');
const jwt = require("jsonwebtoken");
const { v1: uuidv1 } = require('uuid');
require("dotenv").config()

getPedidos = async (req, res) => {
    try {
        const users = await User.find({ "pedidos.0": { $exists: true } });
        // se utiliza para encontrar aquellos usuarios que tienen al menos un elemento en la
        //propiedad pedidos. Esto se logra mediante el operador $exists que verifica la existencia
        //del primer elemento del array pedidos.
        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

hacerPedido = async (req, res) => {
    try {
        const decoded = jwt.verify(req.token, process.env.SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token" });
        }

        const pedido = {
            id: uuidv1(),
            producto: req.body.producto,
            estado: req.body.estado,
            infoUsuario: req.body.infoUsuario
        };

        user.pedidos.push(pedido);
        await user.save();

        return res.status(200).json({ message: "Pedido realizado con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

deletePedido = async (req, res) => {
    try{
        const decoded = jwt.verify(req.token, process.env.SECRET);
        const user = await User.findById(decoded.id, {password: 0});

        if(!user) {
            return res.status(404).json({message: 'Invalid or expired token'});
        }
        user.pedidos = user.pedidos.filter(pedido => pedido.id !== req.body.id);
        await user.save();
        return res.status(200).json({ message: "Pedido cancelado con éxito"})
    } catch(error) {
        return res.json({message: "Error en el server", error})
    }
};