// Models
const User = require('../modelos/usuario');
const jwt = require("jsonwebtoken");
const { v1: uuidv1 } = require('uuid');
require("dotenv").config()
const mercadopago = require('mercadopago');
const axios = require('axios');

let decoded;
let producto;
let infoUsuario;
let token;

crearOrden = async (req, res) => {
    decoded = jwt.verify(req.token, process.env.SECRET);
    producto = req.body.producto;
    infoUsuario = req.body.infoUsuario;
    token = req.token
    mercadopago.configure({
        access_token: 'APP_USR-7044245151571534-071913-ab34e28635ea1c6d392246582fc425be-185217523'
    });
    
    const preference = {
        items: [
            {
            title: 'Producto La Barrosa',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: req.body.precio
            }
        ],
        payment_methods: {
            excluded_payment_methods: [], // No excluye ningún método de pago
            excluded_payment_types: [], // No excluye ningún tipo de pago
            installments: 2, // Número máximo de cuotas
        },
        back_urls: {
            success: 'https://labarrosa-ecommerce-production.up.railway.app/api/pagar/success',
            pendinding: 'https://labarrosa-ecommerce.vercel.app/home',
            failure: 'https://labarrosa-ecommerce.vercel.app/home'
        },
        notification_url: 'https://labarrosa-ecommerce-production.up.railway.app/api/pagar/resultado'
    };
    
    const result = await mercadopago.preferences.create(preference)
    res.json(result.body);
}

recibirOrden = async (req, res) => {
    try {
        const payment = req.query;
        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment["data.id"]);
            if(data.body.status === "approved") {
                try {
                    const userId = decoded.id;
            
                    const user = await User.findById(userId, { password: 0 });
                    if (!user) {
                        return res.status(404).json({ message: "Invalid or expired token" });
                    }
            
                    producto.forEach((p) => {
                        const pedido = {
                            id: uuidv1(),
                            userToken: token,
                            producto: p,
                            estado: "Pendiente",
                            infoUsuario: infoUsuario
                        };
                        user.pedidos.push(pedido);
                    })
                    const postResponse = await axios.post('https://labarrosa-admin-production.up.railway.app/api/pasarAPedido/', producto);
                    // Verifica la respuesta de la solicitud POST y toma medidas según sea necesario
                    if (postResponse.status === 200) {
                        // La solicitud POST se realizó con éxito en el otro servidor
                        console.log('Solicitud POST exitosa en el otro servidor');
                    } else {
                        console.log('La solicitud POST al otro servidor no fue exitosa');
                    }

                    pedido = []
                    infoUsuario = "";
                    token = ""
            
                    await user.save();
                    // https://labarrosa-admin-production.up.railway.app/api/pasarAPedido/
                    return res.status(200).json({ message: "Pedido realizado con éxito" });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ message: "Error en el servidor" });
                }
            }
        }
    
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
}

ordenExitosa = (req, res) => {
    // Aquí, define la URL a la que deseas redireccionar (localhost:4200 en este caso)
    const redirectUrl = 'https://labarrosa-ecommerce.vercel.app/home'; // Cambia esto si necesitas una URL diferente

    // Realiza la redirección
    res.redirect(redirectUrl);
};
