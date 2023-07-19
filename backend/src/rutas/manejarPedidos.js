const { Router } = require("express");
require("../controladores/pedidosController.js");
const router = Router();
require("../libs/middlewares")

// routes

router.get("/", getPedidos);

router.put("/enviado", pedidoEnviado);

router.put("/recibido", pedidoRecibido);

router.put("/", verifyToken, deletePedido);

router.put("/eliminar", deletePedidoAdmin);

module.exports = router;