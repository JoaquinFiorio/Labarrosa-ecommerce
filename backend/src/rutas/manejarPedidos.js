const { Router } = require("express");
require("../controladores/pedidosController.js");
const router = Router();
require("../libs/middlewares")

// routes

router.get("/", getPedidos);

router.post("/", verifyToken, hacerPedido);

router.delete("/",verifyToken, deletePedido);

module.exports = router;