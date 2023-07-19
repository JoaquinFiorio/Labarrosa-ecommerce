// Models
const User = require('../modelos/usuario');
const jwt = require("jsonwebtoken");
const { v1: uuidv1 } = require('uuid');
require("dotenv").config()
const mercadopago = require('mercadopago');

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

pedidoEnviado = async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECRET);
        const user = await User.findById(decoded.id, { password: 0 });

        if (!user) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }
        const pedido = user.pedidos.find((p) => p.id === req.body.id);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        pedido.estado = 'Enviado';

        await user.save();

        return res.status(200).json({ message: 'Pedido actualizado a Enviado con éxito' });
    } catch (error) {
        return res.json({ message: 'Error en el servidor', error });
    }
};

pedidoRecibido = async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECRET);
        const user = await User.findById(decoded.id, { password: 0 });

        if (!user) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }
        const pedido = user.pedidos.find((p) => p.id === req.body.id);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        pedido.estado = 'Recibido';

        await user.save();

        return res.status(200).json({ message: 'Pedido actualizado a Recibido con éxito' });
    } catch (error) {
        return res.json({ message: 'Error en el servidor', error });
    }
}

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
}

deletePedidoAdmin = async (req, res) => {
    try{
        const decoded = jwt.verify(req.body.token, process.env.SECRET);
        const user = await User.findById(decoded.id, {password: 0});

        if(!user) {
            return res.status(404).json({message: 'Invalid or expired token'});
        }
        user.pedidos = user.pedidos.filter(pedido => pedido.id !== req.body.id);
        await user.save();
        return res.json({ message: "Pedido cancelado con éxito"})
    } catch(error) {
        return res.json({message: "Error en el server", error})
    }
};